import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState, useMemo } from 'react'
import { StoreContext } from '../../contexts/store'
import Nav from '../../components/Nav'
import Loading from '../../components/Loading'
import ErrorComponent from '../../components/ErrorComponent'
import ProductComponent from '../../components/ProductComponent'

import ProductOrderingSection from '../../components/ProductOrderingSection'

function BuyProduct() {
  const { id: productId, productAmount } = useParams()

  const [product, setProduct] = useState(null)
  const [productNotFound, setProductNotFound] = useState(false)
  const [productLoading, setProductLoading] = useState(true)
  const [hasStock, setHasStock] = useState(true)
  const [productPrice, setProductPrice] = useState(0)

  const { products, getProductById, productsLoading } =
    useContext(StoreContext)

  const changeProductPrice = ({ dollars, cents } = {}) => {
    const areAllNumbers =
      [dollars, cents]?.filter(value => Number.isFinite(value)).length ===
      2
    if (areAllNumbers) {
      setProductPrice(dollars + cents / 100)
    }
  }

  useEffect(() => {
    if (!productsLoading) {
      const product = getProductById(productId)
      const { dollars = 0, cents = 0 } = product?.price
      setHasStock(product?.stock > 0)
      setProductNotFound(!product)
      setProduct(product)
      changeProductPrice({
        dollars,
        cents
      })
      setProductLoading(false)
    }
  }, [products])



  if (productNotFound) {
    return <ErrorComponent message="Esse produto não existe!" />
  }

  if (!hasStock && !productsLoading) {
    return <ErrorComponent message="Esse produto está sem estoque!" />
  }

  return (
    <>
      <Nav />
      {productLoading ? (
        <Loading />
      ) : (
        <>
          <main className="container">
            <div>
              <h1 className="m-0 mb-2 text-center text-secondary">
                Comprar produto
              </h1>
            </div>
            <div className="grid">
              <div>
                <ProductComponent product={product} isProductPage={true} />
              </div>
              <ProductOrderingSection
                product={product}
                productPrice={productPrice}
                productAmount={productAmount}
              />
            </div>
          </main>
        </>
      )}
    </>
  )
}

export default BuyProduct
