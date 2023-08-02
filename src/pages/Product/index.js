import { useParams } from "react-router-dom";
import { useContext, useEffect, useState, Fragment } from "react";
import { StoreContext } from "../../contexts/store";
import Nav from "../../components/Nav";
import Loading from "../../components/Loading";
import ErrorComponent from "../../components/ErrorComponent";
import ProductComponent from "../../components/ProductComponent";
import ProductInfo from "../../components/ProductInfo";
import ProductReviews from "../../components/ProductReviews";

function Product() {
  const { id: productId } = useParams();

  const [product, setProduct] = useState(null);
  const [productNotFound, setProductNotFound] = useState(false);
  const [productLoading, setProductLoading] = useState(true);

  const { products, getProductById, productsLoading } =
    useContext(StoreContext);

  useEffect(() => {
    if (!productsLoading) {
      const product = getProductById(productId);
      setProductNotFound(!product);
      setProduct(product);
      setProductLoading(false);
    }
  }, [products]);

  if (productNotFound) {
    return <ErrorComponent message="Esse produto não existe!" />;
  }

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
  );
}

export default Product;
