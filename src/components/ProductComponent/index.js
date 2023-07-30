import StockMessage from "../StockMessage";
import { Link } from "react-router-dom";
import "./product.css";

function ProductContent({ product, includeStockMessage }) {
  const { title, seller, imgUrl, description, price, id, stock } = product;
  const { dollars, cents } = price;
  return (
    <div>
      <article>
        <header className="text-center">
          <strong>{title}</strong>
        </header>
        <div className="d-flex flex-column align-items-center align-items-center">
          <img src={imgUrl} alt={title} />
          <div className="mt-4 pt-3 text-center border-top border-secondary border-opacity-25">
            <span className="seller badge bg-light p-1 px-2 rounded">
              {seller}
            </span>

            <div className="description text-center mt-3 text-gray">
              {description}
            </div>
            <div className="price text-start p-1 px-2 mt-2">
              <span>
                R${dollars}
                <sup>{String(cents).padStart(2, 0)}</sup>
              </span>
            </div>
            {includeStockMessage && (
              <div className="stockMessage mt-3">
                <StockMessage stock={stock} />
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

function ProductComponent({
  product,
  isProductPage = false,
  includeStockMessage = false,
}) {
  return (
    <>
      {isProductPage ? (
        <ProductContent
          product={product}
          includeStockMessage={includeStockMessage}
        />
      ) : (
        <Link
          to={`product/${product.id}`}
          className="custom-link shadow-none bg-transparent product">
          <ProductContent
            product={product}
            includeStockMessage={includeStockMessage}
          />
        </Link>
      )}
    </>
  );
}

export default ProductComponent;
