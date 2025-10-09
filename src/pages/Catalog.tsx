import React, { useEffect, useState } from 'react'
import { useCart } from '../context' // ✅ import cart hook

// ✅ Match your products.json structure
interface Product {
  id: number
  slug: string
  title: string
  price: number
  currency: string
  image: string
  rating: number
  stock: number
  category: string
  shortDesc: string
  longDesc: string
  tags: string[]
}

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([])
  const { addToCart } = useCart() // ✅ use cart context

  useEffect(() => {
    fetch('/products.json')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error loading products:', err))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1c] to-[#000] text-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Tesla-style Header */}
        <h1 className="text-3xl md:text-4xl font-[Orbitron] text-center text-[var(--tesla-blue)] tracking-widest mb-8 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
          ⚡ Product Catalog
        </h1>

        {/* Loading State */}
        {products.length === 0 ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="tesla-card flex flex-col p-4 rounded-xl shadow-md bg-[#0d1526] text-gray-200 hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition"
              >
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />

                {/* Product Title */}
                <h2 className="text-lg font-semibold text-gray-100 mb-2">
                  {product.title}
                </h2>

                {/* Product Description */}
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                  {product.shortDesc || product.longDesc}
                </p>

                {/* Price + Add to Cart */}
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-[var(--tesla-blue)] font-semibold">
                    ${product.price.toFixed(2)} {product.currency}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="tesla-btn px-3 py-1.5 rounded-lg text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-[var(--tesla-border)] text-gray-500">
        <p>
          ⚡ {new Date().getFullYear()} Ecoshop 2025
        </p>
      </footer>
    </div>
  )
}
