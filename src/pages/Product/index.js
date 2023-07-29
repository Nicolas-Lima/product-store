import { useParams } from "react-router-dom";
import { useContext, useEffect, useState, Fragment } from "react";
import { StoreContext } from "../../contexts/store";
import Nav from "../../components/Nav";
import Loading from "../../components/Loading";
import ErrorComponent from "../../components/ErrorComponent";
import ProductComponent from "../../components/ProductComponent";
import ProductInfo from "../../components/ProductInfo";

function Product() {
  const { id: productId } = useParams();

  const [product, setProduct] = useState(null);
  const [productNotFound, setProductNotFound] = useState(false);
  const [productLoading, setProductLoading] = useState(true);

  const { products, getProductById } = useContext(StoreContext);

  useEffect(() => {
    const product = getProductById(productId);
    setProductNotFound(!product);
    setProduct(product);
    setProductLoading(false);
  }, []);

  if (productNotFound) {
    return <ErrorComponent message="Esse produto não existe!" />;
  }

  if (productLoading) {
    return <Loading />;
  }

  return (
    <>
      <Nav />
      <main className="container">
        <div className="grid">
          <div>
            {/* <article>
              <header className="text-center">
                <strong>{product.name}</strong>
              </header>
              <div className="d-flex flex-column align-items-center align-items-center">
                <img src={product.imgUrl} alt={product.title} />
                <div className="mt-4 pt-3 text-center border-top border-secondary border-opacity-25">
                  <span className="seller badge bg-light p-1 px-2 rounded">
                    {product.seller}
                  </span>
                  <div className="description text-center mt-3 text-gray">
                    {product.description}
                  </div>
                  <div className="price text-start p-1 px-2 mt-2">
                    <span>
                      R${product.price.dollars}
                      <sup>{product.price.cents}</sup>
                    </span>
                  </div>
                </div>
              </div>
            </article> */}
            <ProductComponent product={product} includeStockMessage={false} />
          </div>
          <div>
            <ProductInfo product={product} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Product;
