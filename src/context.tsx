import React, { createContext, useContext, useState, useEffect } from 'react'

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


interface CartContextType {
  cart: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })

  // 
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product) => {
  setCart((prev) => {
    
    if (prev.find((p) => p.id === product.id)) {
      alert(`"${product.title}" is already in your cart.`)
      return prev
    }

    // 
    alert(`🛒 "${product.title}" has been added to your cart!`)
    return [...prev, product]
  })
}

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id))
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
