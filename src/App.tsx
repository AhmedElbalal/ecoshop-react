import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import { useCart } from './context/CartContext';
import type { Product } from './context/CartContext';





// Premium HomeProducts Component with consistent layout
function HomeProducts({ products }: { products: Product[] }) {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    console.log('Added to cart:', product.title);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            ECOSHOP
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Premium eco-friendly products for sustainable living
          </p>
          <button
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Explore Collection
          </button>
        </div>
      </section>

      {/* Featured Products Section - Consistent with Catalog */}
      <section id="products" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Curated selection of our most popular eco-friendly products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.filter(p => p.featured).map((product) => (
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
                      // Fallback for broken images
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=400&fit=crop&auto=format';
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

          {/* View All CTA */}
          <div className="text-center mt-12">
            <button
              onClick={() => window.location.href = '/catalog'}
              className="px-8 py-4 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">Sustainable products that respect our planet</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Carbon-neutral shipping on all orders</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ethical Sourcing</h3>
              <p className="text-gray-600">Products from responsible suppliers</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// Main App Component
export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Complete product list with WORKING images
    const mockProducts: Product[] = [
      {
        id: 1,
        title: "Bamboo Wireless Headphones",
        price: 129,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop",
        shortDesc: "Eco-friendly bamboo headphones with crystal clear sound and advanced noise cancellation technology.",
        featured: true
      },
      {
        id: 2,
        title: "Solar Powered Watch",
        price: 89,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=400&fit=crop",
        shortDesc: "Sustainable timepiece powered by solar energy with comprehensive fitness tracking features.",
        featured: true
      },
      {
        id: 3,
        title: "Recycled Plastic Earbuds",
        price: 59,
        image: "https://images.unsplash.com/photo-1590658165737-15a047b8b5e0?w=500&h=400&fit=crop",
        shortDesc: "Wireless earbuds made from 100% recycled ocean-bound plastic with exceptional sound quality.",
        featured: true
      },
      {
        id: 4,
        title: "Eco Laptop Sleeve",
        price: 45,
        image: "https://images.unsplash.com/photo-1541560052-77ec1bbc09f7?w=500&h=400&fit=crop",
        shortDesc: "Sustainable laptop protection made from natural, biodegradable materials with perfect fit.",
        featured: false
      },
      {
        id: 5,
        title: "Organic Cotton Tote",
        price: 25,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=400&fit=crop",
        shortDesc: "Reusable shopping bag made from 100% organic cotton, perfect for sustainable shopping.",
        featured: false
      },
      {
        id: 6,
        title: "Bamboo Phone Case",
        price: 35,
        image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&h=400&fit=crop",
        shortDesc: "Biodegradable phone case crafted from sustainable bamboo with modern design.",
        featured: false
      },
      {
        id: 7,
        title: "Solar Power Bank",
        price: 79,
        image: "https://images.unsplash.com/photo-1574944985072-7e6d5f7f7813?w=500&h=400&fit=crop",
        shortDesc: "Portable solar charger with fast charging capability and multiple device support.",
        featured: true
      },
      {
        id: 8,
        title: "Hemp Backpack",
        price: 65,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=400&fit=crop",
        shortDesc: "Durable backpack made from sustainable hemp with multiple compartments and laptop sleeve.",
        featured: false
      },
      {
        id: 9,
        title: "Eco Water Bottle",
        price: 32,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=400&fit=crop",
        shortDesc: "Insulated stainless steel bottle made from recycled materials, keeps drinks hot/cold for hours.",
        featured: true
      },
      {
        id: 10,
        title: "Bamboo Sunglasses",
        price: 48,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=400&fit=crop",
        shortDesc: "Stylish sunglasses crafted from sustainable bamboo with UV400 protection lenses.",
        featured: false
      },
      {
        id: 11,
        title: "Recycled Notebook",
        price: 18,
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=400&fit=crop",
        shortDesc: "Eco-friendly notebook made from 100% recycled paper with sustainable binding.",
        featured: false
      },
      {
        id: 12,
        title: "Cork Yoga Mat",
        price: 75,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=400&fit=crop",
        shortDesc: "Natural cork yoga mat with excellent grip and sustainable harvesting practices.",
        featured: true
      }
    ];

    // Simulate API loading
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading Ecoshop...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>

      <Routes>
        <Route path="/" element={<HomeProducts products={products} />} />
        <Route path="/catalog" element={<Catalog products={products} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </>
  );
}