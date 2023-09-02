import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { StoreContext } from '../../contexts/store'
import { useContext } from 'react'

import ErrorComponent from '../../components/ErrorComponent'
import LoadingSpinner from '../../components/LoadingSpinner'
import Nav from '../../components/Nav'
import { capitalizeFirstLetter } from '../../utils/generalUtils'
import './trackOrder.css'

function TrackOrder() {
  const [order, setOrder] = useState(null)
  const [orderDate, setOrderDate] = useState(null)
  const [orderNotFound, setOrderNotFound] = useState(false)
  const [isProductsLoading, setProductsLoading] = useState(true)

  const { trackingId } = useParams()

  const { userPurchasedProducts, productsLoading } =
    useContext(StoreContext)

  useEffect(() => {
    if (isProductsLoading) {
      setProductsLoading(productsLoading)
    }
  }, [productsLoading])

  useEffect(() => {
    const order =
      Array.isArray(userPurchasedProducts) &&
      userPurchasedProducts?.filter(purchasedProduct => {
        return purchasedProduct.trackingId === trackingId
      })

    const orderNotFound = order.length <= 0 || !order
    if (!orderNotFound) {
      setOrder(order[0])
      const orderDate = new Date(order[0]?.timestamp)

      const [day, month, year] = [
        orderDate.getDate(),
        orderDate.getMonth(),
        orderDate.getFullYear()
      ]
      const monthsName = [
        'janeiro',
        'fevereiro',
        'março',
        'abril',
        'maio',
        'junho',
        'julho',
        'agosto',
        'setembro',
        'outubro',
        'novembro',
        'dezembro'
      ]
      setOrderDate({
        day,
        monthName: monthsName[month],
        year
      })
    }
    setOrderNotFound(orderNotFound)
  }, [userPurchasedProducts])

  if (orderNotFound) {
    return (
      <ErrorComponent
        redirectTo="/orders"
        redirectMessage="Voltar para a página de pedidos!"
        message="ID de rastreamento inválido! "
      />
    )
  }

  if (isProductsLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Nav />
      <div className="container mt-4">
        <hgroup className="orderInfo">
          <h2>{capitalizeFirstLetter(order?.productName)}</h2>
          {orderDate && (
            <h3>
              Pedido feito em {orderDate?.day} de {orderDate?.monthName} de{' '}
              {orderDate?.year}
            </h3>
          )}
        </hgroup>

        <fieldset className="d-flex justify-content-between w-100 border border-secondary border-opacity-10 p-4 pt-4 pb-3 rounded">
          <div className="grid w-100">
            {order?.orderStatus.map((orderStatus, index) => {
              const monthsName = [
                'jan',
                'fev',
                'mar',
                'abr',
                'mai',
                'jun',
                'jul',
                'ago',
                'set',
                'out',
                'nov',
                'dez'
              ]

              const statusId = orderStatus?.statusId
              const statusName = orderStatus?.statusName
              const statusDone = orderStatus?.done?.value ?? false
              const doneDate = orderStatus?.done?.date ?? {}
              const { day: doneDay, month: doneMonth } = doneDate
              const monthName = monthsName[parseInt(doneMonth)]

              return (
                <label key={index} className="mb-3 mb-lg-0">
                  {statusDone ? (
                    <input
                      className="checked"
                      type="radio"
                      name="orderStatus"
                      value={`status-${statusId}`}
                      disabled
                    />
                  ) : (
                    <input
                      type="radio"
                      name="orderStatus"
                      value={`status-${statusId}`}
                      disabled
                    />
                  )}

                  <span>{statusName}</span>
                  {statusDone && (
                    <div className="ms-1 mt-1">
                      <span className="fw-medium">
                        {doneDay}
                        <span className="slash">/</span>
                        {monthName}
                      </span>
                    </div>
                  )}
                </label>
              )
            })}
          </div>
        </fieldset>
      </div>
    </>
  )
}

export default TrackOrder
