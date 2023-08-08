import { Fragment } from 'react'

import ProductComponent from '../ProductComponent'
import PurchasedProduct from '../PurchasedProduct'

function ProductsGridRenderer({
  slicedProductsIntoGroups,
  includeStockMessage = false,
  isListPage = false,
  isCartPage = false,
  isOrdersPage = false
}) {
  if (slicedProductsIntoGroups) {
    return slicedProductsIntoGroups.map((productsGroup, groupIndex) => {
      return (
        <div
          className="grid"
          data-theme="light"
          key={`productsGroup-${groupIndex}`}>
          {productsGroup.map((product, productIndex) => {
            const productKey = `product-${groupIndex}-${productIndex}`
            return (
              <Fragment key={productKey}>
                {product.emptyProduct ? (
                  <div
                    className="empty-product"
                    key={'empty-' + productKey}></div>
                ) : isOrdersPage ? (
                  <PurchasedProduct key={productKey} product={product} />
                ) : (
                  <ProductComponent
                    key={productKey}
                    product={product}
                    isListPage={isListPage}
                    isCartPage={isCartPage}
                    includeStockMessage={includeStockMessage}
                  />
                )}
              </Fragment>
            )
          })}
        </div>
      )
    })
  }
}

export default ProductsGridRenderer
