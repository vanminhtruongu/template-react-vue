import createBaseService from './base.service'

const createAuthService = () => {
    const baseService = createBaseService('/auth')

    // Login
    const login = async (credentials) => {
        const response = await baseService.post('/login', credentials)
        if (response.token) {
            localStorage.setItem('token', response.token)
        }
        return response
    }

    // Register
    const register = async (userData) => {
        return baseService.post('/register', userData)
    }

    // Get current user profile
    const getCurrentUser = async () => {
        return baseService.get('/profile')
    }

    // Update user profile
    const updateProfile = async (profileData) => {
        return baseService.put('/profile', profileData)
    }

    // Change password
    const changePassword = async (passwordData) => {
        return baseService.post('/change-password', passwordData)
    }

    // Logout
    const logout = async () => {
        try {
            await baseService.post('/logout')
        } finally {
            localStorage.removeItem('token')
        }
    }

    // Refresh token
    const refreshToken = async () => {
        const response = await baseService.post('/refresh-token')
        if (response.token) {
            localStorage.setItem('token', response.token)
        }
        return response
    }

    // Check if user is authenticated
    const isAuthenticated = () => {
        return !!baseService.getAuthToken()
    }

    return {
        login,
        register,
        getCurrentUser,
        updateProfile,
        changePassword,
        logout,
        refreshToken,
        isAuthenticated
    }
}

// Create a singleton instance
const authService = createAuthService()
export default authService 