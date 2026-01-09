/**
 * TypeScript Type Definitions for Authentication
 * 
 * This file contains all type definitions used across the authentication
 * system to ensure type safety and better code documentation.
 */

// ============================================
// FORM DATA TYPES
// ============================================

/**
 * User Signup Form Data
 * Note: Email field is excluded as per requirements
 */
export interface SignupFormData {
    firstName: string;      // User's first name
    lastName: string;       // User's last name
    phone: string;          // Phone number with country code (e.g., +966501234567)
    dateOfBirth: string;    // Date of birth in YYYY-MM-DD format
    gender: 'male' | 'female'; // User's gender (required)
}

/**
 * User Login Form Data
 */
export interface LoginFormData {
    phone: string;          // Phone number with country code
    password: string;       // User's password
}

/**
 * OTP Verification Data
 */
export interface OtpVerificationData {
    phone: string;          // Phone number that received the OTP
    otp: string;            // 6-digit OTP code
}

/**
 * Password Creation Data
 */
export interface PasswordCreationData {
    phone: string;          // User's phone number
    password: string;       // New password
    confirmPassword: string; // Password confirmation (must match)
}

// ============================================
// API RESPONSE TYPES
// ============================================

/**
 * Generic API Response Structure
 * Used for all API responses to maintain consistency
 */
export interface ApiResponse<T = any> {
    success: boolean;       // Whether the request was successful
    message: string;        // Human-readable message
    data?: T;               // Optional response data
}

/**
 * OTP Generation Response
 */
export interface OtpGenerationResponse {
    success: boolean;
    message: string;
    otp?: string;           // OTP code (only in development/testing)
}

/**
 * Login Response
 */
export interface LoginResponse {
    success: boolean;
    message: string;
    data?: {
        token: string;        // JWT authentication token
        user: UserData;       // User information
    };
}

/**
 * User Data Structure
 */
export interface UserData {
    id: string;             // User unique identifier
    firstName: string;      // User's first name
    lastName: string;       // User's last name
    phone: string;          // User's phone number
    dateOfBirth: string;    // User's date of birth
    createdAt: string;      // Account creation timestamp
}

// ============================================
// PACKAGE & CHECKOUT TYPES
// ============================================

/**
 * Package/Plan Information
 */
export interface Package {
    id: string;             // Package unique identifier
    name: string;           // Package name (e.g., "الباقة الأساسية")
    price: number;          // Price in SAR
    duration: number;       // Duration in months
    features: string[];     // List of features included
    isPopular?: boolean;    // Whether this is the most popular package
}

/**
 * Checkout Data
 */
export interface CheckoutData {
    packageId: string;      // Selected package ID
    paymentMethod: string;  // Payment method (e.g., "credit_card", "mada")
}

/**
 * Order Confirmation Data
 */
export interface OrderConfirmation {
    orderId: string;        // Order unique identifier
    packageName: string;    // Purchased package name
    amount: number;         // Total amount paid
    paymentStatus: string;  // Payment status (e.g., "paid", "pending")
    accessUrl?: string;     // URL to access the course
}
