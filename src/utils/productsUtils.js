const sliceProductsIntoGroups = products => {
  if (!Array.isArray(products) || products.length === 0) {
    return []
  }

  const productsCopy = [...products]
  const groupSize = 3
  const numberOfGroups = productsCopy.length / groupSize
  const slicedProductGroups = []

  for (let i = 0; i < numberOfGroups; i++) {
    slicedProductGroups.push(productsCopy.splice(0, groupSize))
  }

  slicedProductGroups.map(group => {
    if (group.length !== groupSize) {
      const missingProducts = groupSize - group.length
      for (let i = 0; i < missingProducts; i++) {
        group.push({ emptyProduct: true })
      }
    }
  })

  return slicedProductGroups
}

const productAlreadyInList = (productUid, userSigned, userList) => {
  let list = userList ?? []

  if (!userSigned) {
    const savedList =
      JSON.parse(localStorage.getItem('@guestData'))?.list ?? []
    list = savedList
  }

  if (Array.isArray(list) && list.length > 0) {
    const alreadyInList =
      list.filter(product => product.id === productUid).length > 0
    return alreadyInList
  }
}

export { sliceProductsIntoGroups, productAlreadyInList }
