import StockMessage from "../StockMessage";
import { Link } from "react-router-dom";
import "./product.css";

function ProductComponent({ product, includeStockMessage = true }) {
  const { title, seller, imgUrl, description, price, id, stock } = product;

  return (
    <>
      <Link
        to={`product/${id}`}
        className="custom-link shadow-none bg-transparent product">
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
                    R${price.dollars}
                    <sup>{price.cents}</sup>
                  </span>
                </div>
                {includeStockMessage && (
                  <div className="stockMessage mt-3">
                    <StockMessage stock={stock} withBadge={false} />
                  </div>
                )}
              </div>
            </div>
          </article>
        </div>
      </Link>
    </>
  );
}

export default ProductComponent;
