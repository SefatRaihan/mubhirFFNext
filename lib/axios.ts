import axios from 'axios';

/**
 * Axios HTTP Client Configuration
 * 
 * This file creates a configured axios instance for making API requests
 * to the Mubhir backend with automatic token handling and error management.
 */

// Create axios instance with base configuration
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // https://sat.mubhir.ai/api
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds timeout for requests
});

/**
 * Request Interceptor
 * Automatically adds authentication token to all requests if available
 */
apiClient.interceptors.request.use(
    (config) => {
        // Get auth token from localStorage
        const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

        // Add token to request headers if it exists
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }

        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor
 * Handles common response scenarios like authentication errors
 */
apiClient.interceptors.response.use(
    (response) => {
        // Return successful response
        return response;
    },
    (error) => {
        // Handle 401 Unauthorized - user session expired
        if (error.response?.status === 401) {
            // Clear auth token
            if (typeof window !== 'undefined') {
                localStorage.removeItem('authToken');
                // Redirect to login page
                window.location.href = '/login';
            }
        }

        // Return error for handling in components
        return Promise.reject(error);
    }
);

export default apiClient;
