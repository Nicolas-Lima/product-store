import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../contexts/store'
import { AuthContext } from '../../contexts/auth'

import Nav from '../../components/Nav'

function Orders() {
  const { userPurchasedProducts } = useContext(StoreContext)
  const { userSigned } = useContext(AuthContext)

  return (
    <>
      <Nav />
      <main className="container mt-4">
        {userPurchasedProducts?.length > 0 ? (
          <>
            {/* Purchased Product Component */}
            {userPurchasedProducts.map(purchasedProduct => (
              <>
                {purchasedProduct.productName} {"<=>"}{' '}
                {purchasedProduct.trackingId} <br />
                <div className="mb-4">
                  <hr />
                </div>
              </>
            ))}
            {/* Purchased Product Component */}
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
