import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState, useMemo } from 'react'
import { StoreContext } from '../../contexts/store'
import { AuthContext } from '../../contexts/auth'
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

  const { products, getProductById, productsLoading, productHasStock } =
    useContext(StoreContext)
  const { userUid, sellerUid } = useContext(AuthContext)

  const changeProductPrice = ({ dollars, cents } = {}) => {
    dollars = parseInt(dollars)
    cents = parseInt(cents)

    const areAllNumbers =
      [dollars, cents]?.filter(value => Number.isFinite(value)).length ===
      2
    if (areAllNumbers) {
      setProductPrice(dollars + cents / 100)
    }
  }

  const isUserTheProductSeller =
    !!sellerUid && sellerUid === product?.sellerUid

  useEffect(() => {
    if (!productsLoading) {
      const product = getProductById(productId)
      const { dollars = 0, cents = 0 } = product?.price || {}
      const hasStock = productHasStock(productId)
      setHasStock(hasStock)
      setProductNotFound(!product)
      setProduct(product)
      changeProductPrice({
        dollars,
        cents
      })
      setProductLoading(false)
    }
  }, [products])

  useEffect(() => {
    document.title = product?.name
  }, [product])


  /*
  Correção de bugs envolvendo estoque do produto

  - Corrigido o bug que impossibilitava o produto de ser removido da lista e carrinho quando o mesmo não possuia estoque.

  - Produto era dado como inexistente nas rotas 'product' e 'buyProduct' quando não possuia estoque.
  */

  if (isUserTheProductSeller) {
    return (
      <ErrorComponent message="Você não pode comprar seu próprio produto!" />
    )
  }

  if (hasStock === 'no' && !productsLoading) {
    document.title = 'Produto sem estoque!'
    return <ErrorComponent message="Esse produto está sem estoque!" />
  }

  if (productNotFound) {
    document.title = 'Produto não encontrado!'
    return <ErrorComponent message="Esse produto não existe!" />
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
