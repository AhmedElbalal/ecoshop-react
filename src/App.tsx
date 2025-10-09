import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Catalog from './pages/Catalog'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Wishlist from './pages/Wishlist'
import { useCart } from './context' // ✅ Cart hook

// 
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

// 
function HomeProducts({ products }: { products: Product[] }) {
  const { addToCart } = useCart()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="tesla-card flex flex-col p-4 rounded-xl shadow-md bg-[#0d1526] text-gray-200"
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

          
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            {product.shortDesc || product.longDesc}
          </p>

          {/* Price and Add to Cart */}
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
  )
}

// ✅ Main App component
export default function App() {
  const [products, setProducts] = useState<Product[]>([])

  // Load product data from public/products.json
  useEffect(() => {
    fetch('/products.json')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error loading products:', err))
  }, [])

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gradient-to-br from-[#0a0f1c] to-[#000] text-gray-200">
              {/* ⚡ Tesla Header Section */}
              <header className="relative text-center py-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,229,255,0.05)] to-transparent blur-3xl" />
                <h1 className="relative z-10 text-[2.5rem] md:text-[3.5rem] font-[Orbitron] text-[var(--tesla-blue)] tracking-widest drop-shadow-[0_0_10px_rgba(0,229,255,0.6)]">
                  ⚡ ECOSHOP
                </h1>
                <p className="relative z-10 text-[var(--tesla-gray)] font-[Poppins] text-lg mt-2 tracking-wide">
                  The Future of Online Shopping
                </p>
                <div className="relative z-10 mt-8 w-40 h-[2px] bg-[var(--tesla-blue)] mx-auto animate-pulse rounded-full shadow-[0_0_12px_rgba(0,229,255,0.7)]" />
              </header>

              
              <main className="max-w-7xl mx-auto px-4 pb-10 pt-6">
                {products.length === 0 ? (
                  <div className="text-center text-gray-500 text-lg mt-20">
                    Loading products...
                  </div>
                ) : (
                  <HomeProducts products={products} />
                )}
              </main>

             
              <footer className="text-center py-6 border-t border-[var(--tesla-border)] text-gray-500">
  <p>⚡ {new Date().getFullYear()} Ecoshop</p>
</footer>

            </div>
          }
        />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </Router>
  )
}
