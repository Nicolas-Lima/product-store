function ProductAmountSelect({
  productStock,
  amount,
  setAmount,
  maxPurchaseUnits,
  minPurchaseUnits
}) {
  maxPurchaseUnits = parseInt(maxPurchaseUnits)
  minPurchaseUnits = parseInt(minPurchaseUnits)
  productStock = parseInt(productStock)

  const generateOptionsForAmountSelect = () => {
    const amountArray = [...Array(maxPurchaseUnits - minPurchaseUnits + 1)]

    if (productStock < maxPurchaseUnits) {
      amountArray.length = maxPurchaseUnits - minPurchaseUnits
    }

    return amountArray.map((value, index) => {
      const optionValue = index + minPurchaseUnits

      return (
        <option value={optionValue} key={index}>
          {optionValue}
        </option>
      )
    })
  }

  if (productStock >= minPurchaseUnits) {
    return (
      <>
        <label htmlFor="amount">Quantidade</label>
        <select
          id="amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required>
          {generateOptionsForAmountSelect()}
        </select>
      </>
    )
  }
}

export default ProductAmountSelect
