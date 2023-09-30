import { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../contexts/store'

import Loading from '../Loading'
import ProductsGridRenderer from '../ProductsGridRenderer'
import { sliceProductsIntoGroups } from '../../utils/productsUtils'

function MyProducts() {
  const [slicedProductsIntoGroups, setSlicedProductsIntoGroups] = useState(
    []
  ) // We have to divide the products into groups of 3 so that the PICO.css grid to work better.
  const { myProducts, productsLoading } = useContext(StoreContext)

  useEffect(() => {
    if (myProducts?.length > 0) {
      const productsSlicedIntoGroups = sliceProductsIntoGroups(myProducts)
      setSlicedProductsIntoGroups(productsSlicedIntoGroups)
    }
  }, [myProducts])

  if (productsLoading) {
    return <Loading />
  }

  return (
    <>
      {ProductsGridRenderer({
        slicedProductsIntoGroups,
        includeStockMessage: true,
        myProducts: true
      })}
    </>
  )
}

export default MyProducts
