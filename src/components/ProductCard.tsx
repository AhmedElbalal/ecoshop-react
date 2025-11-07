import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import type { Product } from '../types'
import Rating from './Rating'
import Price from './Price'

export default function ProductCard({ p }: { p: Product }) {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation to product page
    e.stopPropagation()
    addToCart(p)
    // You can add a toast notification here if you want
    console.log('Added to cart:', p.title)
  }

  return (
    <Link to={`/product/${p.slug}`} className="block border rounded-2xl overflow-hidden hover:shadow transition-shadow duration-300">
      <img src={p.image} alt={p.title} className="w-full aspect-square object-cover" />
      <div className="p-4 space-y-2">
        <h3 className="text-sm line-clamp-1 font-medium">{p.title}</h3>
        <Rating value={p.rating} />
        <div className="flex items-center justify-between">
          <Price value={p.price} currency={p.currency} />
          <div className="text-xs opacity-60">{p.category}</div>
        </div>
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full mt-2 bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors duration-200"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  )
}