import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    shortDesc: string;
    featured?: boolean;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    isCartOpen: boolean;
    loading: boolean;
    error: string | null;
}

interface CartContextType {
    items: CartItem[];
    isCartOpen: boolean;
    loading: boolean;
    error: string | null;
    addToCart: (product: Product) => Promise<void>;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    getCartCount: () => number;
    getCartTotal: () => number;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    clearError: () => void;
}

type CartAction =
    | { type: 'ADD_TO_CART_START' }
    | { type: 'ADD_TO_CART_SUCCESS'; payload: Product }
    | { type: 'ADD_TO_CART_ERROR'; payload: string }
    | { type: 'REMOVE_FROM_CART'; payload: number }
    | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'OPEN_CART' }
    | { type: 'CLOSE_CART' }
    | { type: 'TOGGLE_CART' }
    | { type: 'CLEAR_ERROR' }
    | { type: 'LOAD_CART_FROM_STORAGE'; payload: CartItem[] };

const CartContext = createContext<CartContextType | undefined>(undefined);

// Load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    try {
        const saved = localStorage.getItem('ecoshop-cart');
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error('Failed to load cart from storage:', error);
        return [];
    }
};

// Save cart to localStorage
const saveCartToStorage = (items: CartItem[]) => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem('ecoshop-cart', JSON.stringify(items));
    } catch (error) {
        console.error('Failed to save cart to storage:', error);
    }
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_TO_CART_START':
            return {
                ...state,
                loading: true,
                error: null
            };

        case 'ADD_TO_CART_SUCCESS':
            const existingItem = state.items.find(item => item.product.id === action.payload.id);
            let newItems: CartItem[];

            if (existingItem) {
                newItems = state.items.map(item =>
                    item.product.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                newItems = [...state.items, { product: action.payload, quantity: 1 }];
            }

            saveCartToStorage(newItems);

            return {
                ...state,
                items: newItems,
                loading: false,
                error: null
            };

        case 'ADD_TO_CART_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case 'REMOVE_FROM_CART':
            const filteredItems = state.items.filter(item => item.product.id !== action.payload);
            saveCartToStorage(filteredItems);
            return {
                ...state,
                items: filteredItems
            };

        case 'UPDATE_QUANTITY':
            let updatedItems;
            if (action.payload.quantity <= 0) {
                updatedItems = state.items.filter(item => item.product.id !== action.payload.id);
            } else {
                updatedItems = state.items.map(item =>
                    item.product.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                );
            }
            saveCartToStorage(updatedItems);
            return {
                ...state,
                items: updatedItems
            };

        case 'CLEAR_CART':
            saveCartToStorage([]);
            return {
                ...state,
                items: []
            };

        case 'OPEN_CART':
            return {
                ...state,
                isCartOpen: true
            };

        case 'CLOSE_CART':
            return {
                ...state,
                isCartOpen: false
            };

        case 'TOGGLE_CART':
            return {
                ...state,
                isCartOpen: !state.isCartOpen
            };

        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null
            };

        case 'LOAD_CART_FROM_STORAGE':
            return {
                ...state,
                items: action.payload
            };

        default:
            return state;
    }
};

const initialState: CartState = {
    items: [],
    isCartOpen: false,
    loading: false,
    error: null
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = loadCartFromStorage();
        dispatch({ type: 'LOAD_CART_FROM_STORAGE', payload: savedCart });
    }, []);

    const addToCart = async (product: Product): Promise<void> => {
        dispatch({ type: 'ADD_TO_CART_START' });

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 300));

            // Validate product
            if (!product || !product.id) {
                throw new Error('Invalid product');
            }

            dispatch({ type: 'ADD_TO_CART_SUCCESS', payload: product });
            dispatch({ type: 'OPEN_CART' });
        } catch (error) {
            dispatch({
                type: 'ADD_TO_CART_ERROR',
                payload: error instanceof Error ? error.message : 'Failed to add item to cart'
            });
        }
    };

    const removeFromCart = (productId: number) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    };

    const updateQuantity = (productId: number, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const getCartCount = (): number => {
        return state.items.reduce((total, item) => total + item.quantity, 0);
    };

    const getCartTotal = (): number => {
        return state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    const openCart = () => {
        dispatch({ type: 'OPEN_CART' });
    };

    const closeCart = () => {
        dispatch({ type: 'CLOSE_CART' });
    };

    const toggleCart = () => {
        dispatch({ type: 'TOGGLE_CART' });
    };

    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    const value: CartContextType = {
        items: state.items,
        isCartOpen: state.isCartOpen,
        loading: state.loading,
        error: state.error,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getCartTotal,
        openCart,
        closeCart,
        toggleCart,
        clearError
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};