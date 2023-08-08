import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../contexts/store'
import { AuthContext } from '../../contexts/auth'

import Nav from '../../components/Nav'
import { sliceProductsIntoGroups } from '../../utils/productsUtils'
import ProductsGridRenderer from '../../components/ProductsGridRenderer'

function Orders() {
  const { userPurchasedProducts } = useContext(StoreContext)
  const { userSigned } = useContext(AuthContext)
  const [slicedProductsIntoGroups, setSlicedProductsIntoGroups] = useState(
    []
  ) // We have to divide the products into groups of 3 so that the PICO.css grid to work better.

  useEffect(() => {
    if (userSigned) {
      setSlicedProductsIntoGroups(
        sliceProductsIntoGroups(userPurchasedProducts)
      )
    }
  }, [userPurchasedProducts, userSigned])

  return (
    <>
      <Nav />
      <main className="container mt-4">
        {slicedProductsIntoGroups?.length > 0 ? (
          <>
            <h1 className="mb-4 text-center text-secondary">
              Meus pedidos
            </h1>
            {ProductsGridRenderer({
              slicedProductsIntoGroups,
              isOrdersPage: true
            })}
          </>
        ) : (
          <h1 className="text-center text-secondary">
            <span className="d-block">
              Você ainda não comprou nenhum produto!
            </span>
            <span className="d-block mt-4">
              <Link to="/">Comprar produtos</Link>
            </span>
          </h1>
        )}
      </main>
    </>
  )
}

export default Orders
