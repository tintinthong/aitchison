export class Vector {
    v: number[]
    constructor(
        v: number[]
    ) {
        this.v = v
    }
    sum(): number {
        return this.v.reduce((sum, n) => {
            return sum + n
        }, 0)
    }
    average(): number {
        return this.sum() / this.v.length
    }
    add(v2: Vector): Vector {
        if (this.v.length != v2.v.length) {
            throw new Error(`Mistmatch in dimension: ${this.v.length} and ${v2.v.length}`)
        }
        return new Vector(this.v.map((n, i) => {
            return n + v2.v[i]
        }))
    }
    product(v2: Vector): number[] {
        return v2.v.map((n, i) => {
            return n * v2.v[i]
        })
    }
    powerSum(a: number): number {
        return this.v.reduce((sum, n) => {
            return sum + Math.pow(n, a)
        }, 0)
    }
    closure(v: number[]): number[] {
        return v.map((n) => {
            return n / this.sum()
        })
    }
}

export class Composition extends Vector {
    constructor(
        v: number[],
        opts: {
            terse: boolean
        } = {
                terse: false
            }
    ) {
        super(v);
        this.v = (!opts.terse) ? this.closure(this.v) : this.closure(v).slice(0, -1)
    }
    scale(a: number): Composition {
        return new Composition(this.v.map((n) => {
            return Math.pow(n, a) / this.powerSum(a)
        }))
    }
    add(comp2: Composition): Composition {
        if (this.v.length != comp2.v.length) {
            throw new Error(`Mistmatch in dimension: ${this.v.length} and ${comp2.v.length}`)
        }
        return new Composition(this.v.map((n, i) => {
            return n + comp2.v[i]
        }))
    }
    perturb(comp2: Composition): Composition {
        if (this.v.length != comp2.v.length) {
            throw new Error(`Mistmatch in dimension: ${this.v.length} and ${comp2.v.length}`)
        }
        const prodVec = this.product(comp2)
        const tot = prodVec.reduce((sum, n) => {
            return n + sum
        }, 0)
        return new Composition(prodVec.map((n) => {
            return n / tot
        }))

    }
    sub(idxs: number[]): Composition {
        const p: number[] = []
        idxs.forEach((i) => {
            if (i > (this.v.length - 1)) {
                throw new Error(`Index ${i} is outside of range of ${this.v.length}`)
            }
            p.push(this.v[i])
        })
        return new Composition(p)
    }
    subOne(xidx: number): Composition {
        if (xidx > (this.v.length - 1)) {
            throw new Error(`Index ${xidx} is outside of range of ${this.v.length}`)
        }
        return new Composition([...this.v.slice(0, xidx), ...this.v.slice(xidx + 1)])
    }
    innerProduct(comp2: Composition): number {
        let sum: number = 0
        for (let i = 0; i < this.v.length; i++) {
            for (let j = 0; j < comp2.v.length; j++) {
                sum = sum + Math.log(this.v[i]/this.v[j])*Math.log(comp2.v[i]/comp2.v[j])
            }
        }
        return (1/(2*this.v.length))*sum
    }
    alr(): number[]{
        // Must actually check that it sums to 1 or kappa 
        const {v:p} = new Composition(this.v,{terse:true})
        return p.map((x)=>{
            return  Math.log(x) /this.v[this.v.length-1]
        }) 
    }

}