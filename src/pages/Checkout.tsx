import React from 'react'

export default function Checkout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1c] to-[#000] text-gray-200 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-[Orbitron] text-center text-[var(--tesla-blue)] mb-4 drop-shadow-[0_0_10px_rgba(0,229,255,0.6)]">
          💳 Checkout
        </h1>
        <p className="text-center text-gray-400 mb-10">
          Review your order and complete your purchase below.
        </p>

        {/* Tesla-style Form */}
        <form className="bg-[#0d1526] p-8 rounded-2xl shadow-md border border-[rgba(0,229,255,0.1)] space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="w-full bg-transparent border border-[rgba(0,229,255,0.2)] rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--tesla-blue)]"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-gray-300 mb-2 font-medium">
              Billing Address
            </label>
            <input
              id="address"
              type="text"
              placeholder="123 Tesla Avenue, Montréal QC"
              className="w-full bg-transparent border border-[rgba(0,229,255,0.2)] rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--tesla-blue)]"
            />
          </div>

          <div>
            <label htmlFor="card" className="block text-gray-300 mb-2 font-medium">
              Credit Card Number
            </label>
            <input
              id="card"
              type="text"
              inputMode="numeric"
              maxLength={16}
              placeholder="XXXX XXXX XXXX XXXX"
              className="w-full bg-transparent border border-[rgba(0,229,255,0.2)] rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--tesla-blue)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="cvv" className="block text-gray-300 mb-2 font-medium">
                CVV
              </label>
              <input
                id="cvv"
                type="text"
                inputMode="numeric"
                maxLength={3}
                placeholder="123"
                className="w-full bg-transparent border border-[rgba(0,229,255,0.2)] rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--tesla-blue)]"
              />
            </div>

            <div>
              <label htmlFor="expiry" className="block text-gray-300 mb-2 font-medium">
                Expiry Date
              </label>
              <input
                id="expiry"
                type="month"
                className="w-full bg-transparent border border-[rgba(0,229,255,0.2)] rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--tesla-blue)]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 tesla-btn px-6 py-3 rounded-xl text-sm font-semibold"
          >
            Complete Purchase
          </button>
        </form>

        {/* Footer */}
        <footer className="text-center py-6 mt-12 border-t border-[var(--tesla-border)] text-gray-500">
          <p>⚡ {new Date().getFullYear()} Ecoshop 2025</p>
        </footer>
      </div>
    </div>
  )
}
