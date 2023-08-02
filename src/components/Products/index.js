import { useContext, useEffect, useState, Fragment } from "react";
import { StoreContext } from "../../contexts/store";
import ProductComponent from "../ProductComponent";
import Loading from "../Loading";

function Products() {
  const [slicedProductsIntoGroups, setSlicedProductsIntoGroups] = useState(
    []
  ); // We have to divide the products into groups of 3 so that the PICO.css grid to work better.
  const { products, productsLoading } = useContext(StoreContext);

  const sliceProductsIntoGroups = () => {
    const productsCopy = [...products];
    const groupSize = 3;
    const numberOfGroups = productsCopy.length / groupSize;
    const slicedProductGroups = [];

    for (let i = 0; i < numberOfGroups; i++) {
      slicedProductGroups.push(productsCopy.splice(0, groupSize));
    }

    slicedProductGroups.map(group => {
      if (group.length !== groupSize) {
        const missingProducts = groupSize - group.length;
        for (let i = 0; i < missingProducts; i++) {
          group.push({ emptyProduct: true });
        }
      }
    });

    return slicedProductGroups;
  };

  useEffect(() => {
    setSlicedProductsIntoGroups(sliceProductsIntoGroups());
  }, [products]);

  if (productsLoading) {
    return <Loading />;
  }

  return (
    <>
      {slicedProductsIntoGroups.map((productsGroup, groupIndex) => {
        return (
          <div
            className="grid"
            data-theme="light"
            key={`productsGroup-${groupIndex}`}>
            {productsGroup.map((product, productIndex) => {
              const productKey = `product-${groupIndex}-${productIndex}`;
              return (
                <Fragment key={productKey}>
                  {product.emptyProduct ? (
                    <div
                      className="empty-product"
                      key={"empty-" + productKey}></div>
                  ) : (
                    <ProductComponent
                      key={productKey}
                      product={product}
                      includeStockMessage={true}
                    />
                  )}
                </Fragment>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default Products;
