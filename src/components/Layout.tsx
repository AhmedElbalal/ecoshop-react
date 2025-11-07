import React from 'react';
import Navbar from './Navbar';
import CartSidebar from './CartSidebar';
import LoginModal from './LoginModal';

interface LayoutProps {
    children: React.ReactNode;
    className?: string;
}

export default function Layout({ children, className = '' }: LayoutProps) {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className={className}>
                {children}
            </main>
            <CartSidebar />
            <LoginModal />
        </div>
    );
}