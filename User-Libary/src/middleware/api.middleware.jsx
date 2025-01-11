import { Toast } from 'primereact/toast'

// Middleware function creator
const createMiddleware = () => {
    let toast = null

    const setToast = (toastRef) => {
        toast = toastRef
    }

    // Request middleware
    const requestMiddleware = async (config) => {
        // Add any request preprocessing here
        return config
    }

    // Response middleware
    const responseMiddleware = async (response) => {
        // Handle successful responses
        if (response?.data?.message && toast) {
            toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: response.data.message,
                life: 3000
            })
        }
        return response
    }

    // Error middleware
    const errorMiddleware = async (error) => {
        // Handle error responses
        const errorMessage = error.response?.data?.message || 'An error occurred'
        
        if (toast) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: errorMessage,
                life: 3000
            })
        }

        // Handle specific error codes
        switch (error.response?.status) {
            case 422: // Validation error
                // Handle validation errors
                break
            case 429: // Too many requests
                // Handle rate limiting
                break
            case 500: // Server error
                // Handle server errors
                break
            default:
                // Handle other errors
                break
        }

        throw error
    }

    return {
        setToast,
        requestMiddleware,
        responseMiddleware,
        errorMiddleware
    }
}

export const apiMiddleware = createMiddleware() 