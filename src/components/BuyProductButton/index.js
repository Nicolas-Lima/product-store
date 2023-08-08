import { Link } from 'react-router-dom'
function BuyProductButton({ productId, purchaseData }) {
  return (
    <>
      <Link to={`/buyProduct/${productId}/${purchaseData?.amount}`} className='text-decoration-none'>
        <button className="btn-yellow">Comprar</button>
      </Link>
    </>
  )
}

export default BuyProductButton
