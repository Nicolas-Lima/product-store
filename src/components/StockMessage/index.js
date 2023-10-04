function StockMessage({ stock, minPurchaseUnits, withBadge = false }) {
  minPurchaseUnits = parseInt(minPurchaseUnits)
  const hasStock = stock >= minPurchaseUnits

  return (
    <>
      {hasStock ? (
        <span
          className={`${
            withBadge ? 'text-white bagde bg-success' : 'text-success'
          } rounded p-1 px-2`}>
          Em estoque!
        </span>
      ) : (
        <span
          className={`${
            withBadge ? 'text-white bagde bg-danger' : 'text-danger'
          } rounded p-1 px-2`}>
          Sem estoque!
        </span>
      )}
    </>
  )
}

export default StockMessage
