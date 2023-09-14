import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import { toast } from 'react-toastify'
import Nav from '../../components/Nav'

function Sell() {
  const navigate = useNavigate()
  const { seller, hasSellerAccount } = useContext(AuthContext)

  useEffect(() => {
    if (!hasSellerAccount) {
      navigate('/registerSeller')
    }
  }, [hasSellerAccount, navigate])

  document.title = 'Vender'

  return (
    <>
      <Nav />
      <main className="container mt-3 mb-2-3rem">
        <div className="d-flex flex-column align-items-center">
          <h1 className="text-secondary">
            Você possui uma conta de vendedor!
          </h1>
          <pre className="fs-5 text-success p-4">
            {JSON.stringify(seller, null, 2)}
          </pre>
        </div>
      </main>
    </>
  )
}

export default Sell
