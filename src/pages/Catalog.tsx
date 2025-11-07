import React from 'react'
import Layout from '../components/Layout'
import { useCart } from '../context/CartContext'
import type { Product } from '../context/CartContext' // Import from context, not '../context'

interface CatalogProps {
  products: Product[]
}

export default function Catalog({ products }: CatalogProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    console.log('Added to cart:', product.title)
  }

  return (
    <Layout>
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All Eco Products
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our complete collection of sustainable, eco-friendly products
            </p>
          </div>

          {/* Products Grid - Same as Home */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=400&fit=crop&auto=format'
                    }}
                  />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.title}
                    </h3>
                    <span className="text-xl font-bold text-green-600">
                      ${product.price}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {product.shortDesc}
                  </p>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}