const sliceProductsIntoGroups = products => {
  const productsCopy = [...products];
  const groupSize = 3;
  const numberOfGroups = productsCopy.length / groupSize;
  const slicedProductGroups = [];

  for (let i = 0; i < numberOfGroups; i++) {
    slicedProductGroups.push(productsCopy.splice(0, groupSize));
  }

  slicedProductGroups.map(group => {
    if (group.length !== groupSize) {
      const missingProducts = groupSize - group.length;
      for (let i = 0; i < missingProducts; i++) {
        group.push({ emptyProduct: true });
      }
    }
  });

  return slicedProductGroups;
};


export { sliceProductsIntoGroups }