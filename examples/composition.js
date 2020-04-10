
import { Composition } from '../dist/index';

// All methods inherited from Vector
const v1 = new Composition([1,2,3,4])
const v2 = new Composition([2,2,3,4])

console.log(v1);
console.log(v2);
console.log(v1.sum());
console.log(v1.average());
console.log(v1.add(v2))

console.log(v1.constructor.name)
console.log(v2.constructor.name)
console.log(v1.add(v2).constructor.name)

console.log(v1.scale(10))
console.log(v1.perturb(v2))

console.log(v1.sub([0,1,2]))
console.log(v1.subOne(3))
console.log(v1.innerProduct(v2))

const v3 = new Composition([0.1,0.2,0.3,0.4])
console.log(v3.alr())