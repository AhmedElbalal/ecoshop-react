import { Link } from 'react-router-dom'
export default function OrderSuccess() {
  return (
    <div className="container max-w-lg mx-auto text-center space-y-4 py-12">
      <div className="text-3xl">Thank you</div>
      <p>Your order has been placed.</p>
      <Link to="/catalog" className="underline">Continue shopping</Link>
    </div>
  )
}
