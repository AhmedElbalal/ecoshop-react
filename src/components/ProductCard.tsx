import { Link } from 'react-router-dom'
import type { Product } from '../types'
import Rating from './Rating'
import Price from './Price'

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link to={`/product/${p.slug}`} className="block border rounded-2xl overflow-hidden hover:shadow">
      <img src={p.image} alt={p.title} className="w-full aspect-square object-cover" />
      <div className="p-4 space-y-1">
        <h3 className="text-sm line-clamp-1">{p.title}</h3>
        <Rating value={p.rating} />
        <div className="flex items-center justify-between">
          <Price value={p.price} currency={p.currency} />
          <div className="text-xs opacity-60">{p.category}</div>
        </div>
      </div>
    </Link>
  )
}
