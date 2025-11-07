import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartSidebar() {
    const {
        items,
        isCartOpen,
        closeCart,
        removeFromCart,
        updateQuantity,
        getCartTotal
    } = useCart();

    const navigate = useNavigate();

    const handleCheckout = () => {
        closeCart();
        navigate('/checkout');
    };

    const handleContinueShopping = () => {
        closeCart();
        navigate('/catalog');
    };

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeCart} />

            {/* Cart Panel */}
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-900">Your Cart</h2>
                        <button
                            onClick={closeCart}
                            className="text-gray-400 hover:text-gray-500"
                            aria-label="Close cart"
                        >
                            <span className="text-2xl">&times;</span>
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto px-6 py-4">
                        {items.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-gray-400 text-6xl mb-4">🛒</div>
                                <p className="text-gray-500 text-lg">Your cart is empty</p>
                                <p className="text-gray-400 text-sm mt-2">Add some eco-friendly products!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item: any) => (
                                    <div key={item.product.id} className="flex items-center space-x-4 border-b border-gray-100 pb-4">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.title}
                                            className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-medium text-gray-900 truncate">
                                                {item.product.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">${item.product.price}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                                aria-label="Decrease quantity"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center text-sm font-medium">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                            aria-label="Remove item"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="border-t border-gray-200 px-6 py-4">
                            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                                <p>Subtotal</p>
                                <p>${getCartTotal().toFixed(2)}</p>
                            </div>
                            <div className="space-y-2">
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                                >
                                    Proceed to Checkout
                                </button>
                                <button
                                    onClick={handleContinueShopping}
                                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}