import StockMessage from "../StockMessage";
import "./productInfo.css";

function ProductInfo({ product }) {
  const hasStock = product.stock > 0;
  const { minPurchaseUnits } = product;

  const generateOptionsForAmountSelect = () => {
    const amountArray = [...Array(product.maxPurchaseUnits)];
    return amountArray.map((value, index) => {
      const optionValue = index + minPurchaseUnits;
      return (
        <option value={optionValue} key={index}>
          {optionValue}
        </option>
      );
    });
  };

  return (
    <>
      <article>
        <div>
          <div className="price text-start p-1 px-2 mt-2">
            <span>
              R${product.price.dollars}
              <sup>{product.price.cents}</sup>
            </span>
          </div>
          <div className="mt-2 mb-3">
            <StockMessage stock={product.stock} />
          </div>
          {hasStock && (
            <div className="amount-container">
              <label htmlFor="amount">Quantidade</label>
              <select id="amount" required>
                {generateOptionsForAmountSelect()}
              </select>
            </div>
          )}
          <div className="about-container mb-3">
            <strong>Sobre este item</strong>: {product.description}
          </div>

          <div className="actions">
            {hasStock && (
              <>
                <button>Comprar</button>
                <button className="btn-yellow">
                  Adicionar ao carrinho
                </button>
              </>
            )}
            <button className="contrast btn-grey">
              Adicionar à Lista
            </button>
          </div>
        </div>
      </article>
    </>
  );
}

export default ProductInfo;
