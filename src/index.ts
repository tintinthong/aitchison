export class Vector {
    v: number[]
    constructor(
        v: number[]
    ) {
        this.v = v
    }
    sum():number {
        return this.v.reduce((sum,n)=>{
            return sum+n
        },0)
    }
    len(): number{
        return this.v.length 
    }
    average(): number{
        return this.sum()/this.v.length
    }
    add(v2: Vector): Vector{
        if(this.v.length != v2.len()){
            throw new Error("Vector not off the same length")
        }
        const vout = this.v.map((n,i)=>{
            return n+v2.v[i]
        })
        return new Vector(vout)
    }

}
