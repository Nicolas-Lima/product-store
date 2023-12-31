import { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../contexts/store'
import { AuthContext } from '../../contexts/auth'

import Nav from '../../components/Nav'
import { sliceProductsIntoGroups } from '../../utils/productsUtils'
import ProductsGridRenderer from '../../components/ProductsGridRenderer'

function Cart() {
  const { userCart } = useContext(StoreContext)
  const { userSigned } = useContext(AuthContext)
  const [slicedProductsIntoGroups, setSlicedProductsIntoGroups] = useState(
    []
  ) // We have to divide the products into groups of 3 so that the PICO.css grid to work better.

  useEffect(() => {
    if (userSigned) {
      setSlicedProductsIntoGroups(sliceProductsIntoGroups(userCart))
    }
  }, [userCart, userSigned])

  document.title = 'Meu carrinho'
  
  return (
    <>
      <Nav />
      <main className="container mt-4">
        {slicedProductsIntoGroups?.length > 0 ? (
          <>
            <h1 className="mb-4 text-center text-secondary">
              Meu carrinho
            </h1>
            {ProductsGridRenderer({
              slicedProductsIntoGroups,
              isCartPage: true
            })}
          </>
        ) : (
          <h1 className="text-center text-secondary">
            Você não possui produtos em seu carrinho!
          </h1>
        )}
      </main>
    </>
  )
}

export default Cart
