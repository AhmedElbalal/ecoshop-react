import React from 'react'
import { useCart } from '../context'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart()

  const total = cart.reduce((sum, p) => sum + p.price, 0)

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0f1c] to-[#000] flex flex-col items-center justify-center text-center text-gray-200 px-4">
        <h1 className="text-3xl font-[Orbitron] text-[var(--tesla-blue)] mb-4 drop-shadow-[0_0_10px_rgba(0,229,255,0.6)]">
          🛒 Your Cart is Empty
        </h1>
        <p className="text-gray-400 mb-6">
          You haven’t added anything yet. Start exploring our catalog!
        </p>
        <Link
          to="/catalog"
          className="tesla-btn px-6 py-3 rounded-xl text-sm"
        >
          Browse Catalog
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1c] to-[#000] text-gray-200 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-[Orbitron] text-center text-[var(--tesla-blue)] tracking-widest mb-8 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
          🛒 Your Cart
        </h1>

        {/* Cart Items */}
        <ul className="divide-y divide-[rgba(0,229,255,0.1)]">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between py-4 hover:bg-[rgba(0,229,255,0.03)] rounded-lg transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg border border-[rgba(0,229,255,0.2)]"
                />
                <div>
                  <p className="font-medium text-gray-100">{item.title}</p>
                  <p className="text-sm text-gray-400">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-400 text-sm font-medium"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        {/* Cart Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
          <button
            onClick={clearCart}
            className="bg-gray-800 text-gray-300 px-6 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Clear Cart
          </button>

          <div className="text-lg font-semibold text-[var(--tesla-blue)]">
            Total: ${total.toFixed(2)} CAD
          </div>

          <Link
            to="/checkout"
            className="tesla-btn px-6 py-3 rounded-xl text-sm"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-[var(--tesla-border)] text-gray-500 mt-10">
        <p>⚡ {new Date().getFullYear()} Ecoshop | Inspired by Nikola Tesla</p>
      </footer>
    </div>
  )
}
