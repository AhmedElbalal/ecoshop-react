import React from 'react';
import { useCart } from '../context/CartContext';

export default function DebugContext() {
    const context = useCart();

    console.log('Cart Context:', context);
    console.log('Items:', context.items);
    console.log('Items type:', typeof context.items);
    console.log('Items length:', context.items?.length);

    return null;
}