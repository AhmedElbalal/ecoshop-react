import React from 'react'

export default function Wishlist() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">💖 Wishlist</h1>
      <p className="text-gray-600 mb-6">
        You haven’t added any favorites yet. Start browsing our products!
      </p>
      <a
        href="/catalog"
        className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
      >
        Browse Products
      </a>
    </div>
  )
}
