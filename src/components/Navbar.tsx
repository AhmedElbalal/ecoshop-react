import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar w-full px-6 py-4 border-b border-[var(--tesla-border)] backdrop-blur-lg bg-[rgba(10,15,28,0.9)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Title */}
        <h1 className="text-2xl font-[Orbitron] text-[var(--tesla-blue)] tracking-widest flex items-center gap-2">
          ⚡ <span className="font-semibold">ECOSHOP</span>
        </h1>

        {/* Navigation Links */}
        <div className="space-x-8 text-[var(--tesla-gray)] font-[Poppins] text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-[var(--tesla-blue)] transition ${
                isActive ? 'text-[var(--tesla-blue)] font-semibold' : ''
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              `hover:text-[var(--tesla-blue)] transition ${
                isActive ? 'text-[var(--tesla-blue)] font-semibold' : ''
              }`
            }
          >
            Catalog
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `hover:text-[var(--tesla-blue)] transition ${
                isActive ? 'text-[var(--tesla-blue)] font-semibold' : ''
              }`
            }
          >
            Cart
          </NavLink>

          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              `hover:text-[var(--tesla-blue)] transition ${
                isActive ? 'text-[var(--tesla-blue)] font-semibold' : ''
              }`
            }
          >
            Checkout
          </NavLink>

          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `hover:text-[var(--tesla-blue)] transition ${
                isActive ? 'text-[var(--tesla-blue)] font-semibold' : ''
              }`
            }
          >
            Wishlist
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
