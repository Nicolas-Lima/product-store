import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState, Fragment } from 'react'
import { StoreContext } from '../../contexts/store'
import Nav from '../../components/Nav'
import Loading from '../../components/Loading'
import ErrorComponent from '../../components/ErrorComponent'
import ProductComponent from '../../components/ProductComponent'
import ProductInfo from '../../components/ProductInfo'
import ProductReviews from '../../components/ProductReviews'

function Product() {
  const { id: productId } = useParams()

  const [product, setProduct] = useState(null)
  const [productNotFound, setProductNotFound] = useState(false)
  const [productLoading, setProductLoading] = useState(true)
  const [hasStock, setHasStock] = useState(true)

  const { products, getProductById, productsLoading, productHasStock } =
    useContext(StoreContext)

  useEffect(() => {
    if (!productsLoading) {
      const product = getProductById(productId)
      const hasStock = productHasStock(productId)
      setHasStock(hasStock)
      setProductNotFound(!product)
      setProduct(product)
      setProductLoading(false)
    }
  }, [products])

  if (hasStock === 'no' && !productsLoading) {
    document.title = 'Produto sem estoque!'
    return <ErrorComponent message="Esse produto está sem estoque!" />
  }

  if (productNotFound) {
    document.title = 'Produto não encontrado!'
    return <ErrorComponent message="Esse produto não existe!" />
  }

  document.title = product?.name

  return (
    <>
      <Nav />
      {productLoading ? (
        <Loading />
      ) : (
        <>
          <main className="container">
            <div className="grid">
              <div>
                <ProductComponent product={product} isProductPage={true} />
              </div>
              <div>
                <ProductInfo product={product} />
              </div>
            </div>
            <div>
              <ProductReviews reviews={product?.reviews} />
            </div>
          </main>
        </>
      )}
    </>
  )
}

export default Product
