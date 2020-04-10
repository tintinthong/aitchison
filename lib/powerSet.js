
export const powerSet = 
theArray => theArray.reduce(
  (subsets, value) => subsets.concat(
   subsets.map(set => [value,...set])
  ),
  [[]]
);
