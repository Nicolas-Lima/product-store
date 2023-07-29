import "./productInfo.css";

function ProductInfo({ product }) {
  const hasStock = product.stock > 0;
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
          {hasStock ? (
            <div className="mt-1">
              <span className="text-white bagde bg-success rounded p-1 px-2">
                Em estoque!
              </span>
            </div>
          ) : (
            <div className="mt-1">
              <span className="text-white bagde bg-danger rounded p-1 px-2">
                Produto sem estoque!
              </span>
            </div>
          )}
          {hasStock && (
            <div className="amount-container mt-2">
              <label htmlFor="amount">Quantidade</label>
              <select id="amount" required>
                {[...Array(product.maxPurchaseUnits)].map(
                  (value, index) => {
                    return (
                      <option value={index + 1} key={index}>
                        {index + 1}
                      </option>
                    );
                  }
                )}
              </select>
            </div>
          )}
          <div className="about-container mt-2 mb-3">
            <strong>Sobre este item</strong>: {product.description}
          </div>

          <div className="actions">
            {hasStock && (
              <>
                <button className="btn-orange">Comprar</button>
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
