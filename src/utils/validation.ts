export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

export const validateEmail = (email: string): ValidationResult => {
    const errors: string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        errors.push('Email is required');
    } else if (!emailRegex.test(email)) {
        errors.push('Please enter a valid email address');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const validatePassword = (password: string): ValidationResult => {
    const errors: string[] = [];

    if (!password) {
        errors.push('Password is required');
    } else if (password.length < 6) {
        errors.push('Password must be at least 6 characters');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const validateRequired = (value: string, fieldName: string): ValidationResult => {
    const errors: string[] = [];

    if (!value?.trim()) {
        errors.push(`${fieldName} is required`);
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const validateCardNumber = (cardNumber: string): ValidationResult => {
    const errors: string[] = [];
    const cardRegex = /^\d{16}$/;

    if (!cardNumber) {
        errors.push('Card number is required');
    } else if (!cardRegex.test(cardNumber.replace(/\s/g, ''))) {
        errors.push('Please enter a valid 16-digit card number');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const validateExpiryDate = (expiry: string): ValidationResult => {
    const errors: string[] = [];
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;

    if (!expiry) {
        errors.push('Expiry date is required');
    } else if (!expiryRegex.test(expiry)) {
        errors.push('Please enter a valid expiry date (MM/YY)');
    } else {
        const [month, year] = expiry.split('/');
        const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
        const currentDate = new Date();

        if (expiryDate < currentDate) {
            errors.push('Card has expired');
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};