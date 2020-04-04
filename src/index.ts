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
    len(): number {
        return this.v.length
    }
    average(): number {
        return this.sum() / this.v.length
    }
    add(v2: Vector): Vector {
        if (this.v.length != v2.len()) {
            throw new Error(`Mistmatch in dimension: ${this.v.length} and ${v2.len}`)
        }
        return new Vector(this.v.map((n, i) => {
            return n + v2.v[i]
        }))
    }
    product(v2: Vector):number[]{
        return v2.v.map((n, i) => {
            return n*v2.v[i]
        }) 
    }
    powerSum(a: number):number{
        return this.v.reduce((sum, n) => {
            return sum + n^a
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
    scale(a: number):Composition{
        return new Composition(this.v.map((n)=>{
            return n^a/this.powerSum(a)
        }))
    }
    add(comp2: Composition): Composition {
        if (this.v.length != comp2.len()) {
            throw new Error(`Mistmatch in dimension: ${this.v.length} and ${comp2.len}`)
        }
        return new Composition(this.v.map((n, i) => {
            return n + comp2.v[i]
        }))
    }
    perturb(comp2: Composition): Composition {
        if (this.v.length != comp2.len()) {
            throw new Error(`Mistmatch in dimension: ${this.v.length} and ${comp2.len}`)
        }
        const prodVec = this.product(comp2) 
        const tot = prodVec.reduce((sum, n)=>{
            return n+sum
        },0)
        return new Composition(prodVec.map((n)=>{
            return n/tot
        }))

    }

}