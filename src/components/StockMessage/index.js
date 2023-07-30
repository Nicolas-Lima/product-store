function StockMessage({ stock, withBadge = false }) {
  const hasStock = stock > 0;
  return (
    <>
      {hasStock ? (
        <span
          className={`${
            withBadge ? "text-white bagde bg-success" : "text-success"
          } rounded p-1 px-2`}>
          Em estoque!
        </span>
      ) : (
        <span
          className={`${
            withBadge ? "text-white bagde bg-danger" : "text-danger"
          } rounded p-1 px-2`}>
          Sem estoque!
        </span>
      )}
    </>
  );
}

export default StockMessage;
