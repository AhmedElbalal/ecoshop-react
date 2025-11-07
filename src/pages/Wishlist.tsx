import React from 'react'
import Layout from '../components/Layout'

export default function Wishlist() {
  return (
    <Layout>
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Wishlist
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Save your favorite eco-friendly products
            </p>
          </div>

          {/* Your wishlist content here */}
        </div>
      </div>
    </Layout>
  )
}