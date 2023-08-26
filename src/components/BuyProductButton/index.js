import { Link } from 'react-router-dom'
function BuyProductButton({ productId, purchaseData }) {
  const purchaseAmount = purchaseData?.amount
  const linkTo = purchaseAmount
    ? `/buyProduct/${productId}/${purchaseAmount}`
    : `/buyProduct/${productId}`

  return (
    <>
      <Link to={linkTo} className="text-decoration-none">
        <button className="btn-yellow">Comprar</button>
      </Link>
    </>
  )
}

export default BuyProductButton
