import { useContext } from "react";
import { StoreContext } from "../../contexts/store";
import StockMessage from "../StockMessage";
import "./productInfo.css";

function ProductInfo({ product }) {
  const { addProductToList } = useContext(StoreContext);
  const hasStock = product.stock > 0;
  const { minPurchaseUnits, maxPurchaseUnits, price } = product;
  const { dollars, cents } = price;

  const generateOptionsForAmountSelect = () => {
    const amountArray = [
      ...Array(maxPurchaseUnits - minPurchaseUnits + 1),
    ];
    return amountArray.map((value, index) => {
      const optionValue = index + minPurchaseUnits;
      return (
        <option value={optionValue} key={index}>
          {optionValue}
        </option>
      );
    });
  };

  const handleAddProductToList = () => {
    addProductToList(product.id);
  };

  return (
    <>
      <article className="mb-0">
        <div>
          <div className="price text-start p-1 px-2 mt-2">
            <span>
              R${dollars}
              <sup>{String(cents).padStart(2, 0)}</sup>
            </span>
          </div>
          <div className="mt-2 mb-3">
            <StockMessage stock={product.stock} withBadge={true} />
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
            {hasStock ? (
              <>
                <button className="btn-yellow">Comprar</button>
                <button>Adicionar ao carrinho</button>
                <button
                  className="btn-grey"
                  onClick={handleAddProductToList}>
                  Adicionar à Lista
                </button>
              </>
            ) : (
              <button onClick={handleAddProductToList}>
                Adicionar à Lista
              </button>
            )}
          </div>
        </div>
      </article>
    </>
  );
}

export default ProductInfo;
