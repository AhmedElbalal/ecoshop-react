import React, { useState, createContext, useContext, ReactNode } from 'react';

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoginOpen: boolean;
    openLogin: () => void;
    closeLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const login = async (email: string, password: string): Promise<boolean> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (email === 'demo@ecoshop.com' && password === 'password') {
                    setUser({
                        id: '1',
                        email: email,
                        name: 'Demo User'
                    });
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
    };

    const openLogin = () => {
        setIsLoginOpen(true);
    };

    const closeLogin = () => {
        setIsLoginOpen(false);
    };

    const value: AuthContextType = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoginOpen,
        openLogin,
        closeLogin
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};