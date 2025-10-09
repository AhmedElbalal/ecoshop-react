import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="text-center py-20 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-indigo-700 mb-4">Welcome to Ecoshop 🛍️</h1>
      <p className="text-gray-600 text-lg mb-8">
        Discover amazing deals and the best products for your lifestyle.
      </p>
      <Link
        to="/catalog"
        className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
      >
        Browse Catalog
      </Link>
    </div>
  )
}
