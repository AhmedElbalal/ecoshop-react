import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../app/store'
import { add } from '../features/cart/cartSlice'
import Rating from '../components/Rating'
import Price from '../components/Price'

export default function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const p = useSelector((s: RootState) => s.products.items.find(x => x.slug === slug))
  if (!p) return <div className="container py-8">Not found</div>
  return (
    <div className="container py-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src={p.image} alt={p.title} className="w-full rounded-2xl" />
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">{p.title}</h1>
          <Rating value={p.rating} />
          <Price value={p.price} currency={p.currency} />
          <p className="opacity-80">{p.longDesc}</p>
          <div className="flex gap-3">
            <button onClick={() => dispatch(add({ id: p.id }))} className="px-4 py-2 rounded-xl bg-black text-white">Add to Cart</button>
            <button onClick={() => { dispatch(add({ id: p.id })); navigate('/cart') }} className="px-4 py-2 rounded-xl bg-black text-white">Buy Now</button>
          </div>
          <div className="text-sm opacity-70">Stock: {p.stock}</div>
        </div>
      </div>
      <div><Link to="/catalog" className="underline">Back to Catalog</Link></div>
    </div>
  )
}
