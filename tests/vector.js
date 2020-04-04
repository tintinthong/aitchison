const {Vector} = require('../dist/index');

const v1 = new Vector([1,2,3,4])
const v2 = new Vector([2,2,3,4])

console.log(v1);
console.log(v2);
console.log(v1.sum());
console.log(v1.average());
console.log(v1.len(v2))
console.log(v1.add(v2))



