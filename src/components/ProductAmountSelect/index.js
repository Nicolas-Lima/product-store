function ProductAmountSelect({amount, setAmount, maxPurchaseUnits, minPurchaseUnits}) {
    const generateOptionsForAmountSelect = () => {
    const amountArray = [...Array(maxPurchaseUnits - minPurchaseUnits + 1)]
    return amountArray.map((value, index) => {
      const optionValue = index + minPurchaseUnits
      return (
        <option value={optionValue} key={index}>
          {optionValue}
        </option>
      )
    })
  }
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

export default ProductAmountSelect