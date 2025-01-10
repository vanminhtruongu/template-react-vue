import { useState, useEffect } from 'react'

export const useAuth = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token')
        if (token) {
            // Validate token and get user info
            setUser({ id: 1, name: 'Test User' }) // This is just a placeholder
        }
        setLoading(false)
    }, [])

    const login = async (credentials) => {
        try {
            // Call login API
            const response = { token: 'test-token', user: { id: 1, name: 'Test User' } } // Placeholder
            localStorage.setItem('token', response.token)
            setUser(response.user)
            return true
        } catch (error) {
            console.error('Login failed:', error)
            return false
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return { user, loading, login, logout }
} 