import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../contexts/store";

import ProductsGridRenderer from "../ProductsGridRenderer";
import { sliceProductsIntoGroups } from "../../utils/productsUtils";
import Loading from "../Loading";

function Products() {
  const [slicedProductsIntoGroups, setSlicedProductsIntoGroups] = useState(
    []
  ); // We have to divide the products into groups of 3 so that the PICO.css grid to work better.
  const { products, productsLoading, searchResults } =
    useContext(StoreContext);

  useEffect(() => {
    if (!productsLoading) {
      const searchResultsSlicedIntoGroups =
        sliceProductsIntoGroups(searchResults);
      setSlicedProductsIntoGroups(searchResultsSlicedIntoGroups);
    }
  }, [searchResults]);

  useEffect(() => {
    if (products.length > 0) {
      const productsSlicedIntoGroups = sliceProductsIntoGroups(products);
      setSlicedProductsIntoGroups(productsSlicedIntoGroups);
    }
  }, [products]);

  if (productsLoading) {
    return <Loading />;
  }

  return (
    <>
      {ProductsGridRenderer({
        slicedProductsIntoGroups,
        includeStockMessage: true,
      })}
    </>
  );
}

export default Products;
