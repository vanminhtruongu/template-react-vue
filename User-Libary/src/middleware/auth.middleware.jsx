import { Navigate, useLocation } from 'react-router-dom'
import authService from '../services/auth.service'
import { ROUTES } from '../constants/routes'

export const RequireAuth = ({ children }) => {
    const location = useLocation()

    if (!authService.isAuthenticated()) {
        // Redirect to login page but save the attempted url
        return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
    }

    return children
}

export const RequireGuest = ({ children }) => {
    const location = useLocation()
    const from = location.state?.from?.pathname || ROUTES.HOME

    if (authService.isAuthenticated()) {
        // Redirect to home or previous attempted url
        return <Navigate to={from} replace />
    }

    return children
}

export const RequireRole = (roles) => {
    return ({ children }) => {
        const location = useLocation()
        const user = authService.getCurrentUser()

        if (!user || !roles.includes(user.role)) {
            // Redirect to unauthorized page or home
            return <Navigate to={ROUTES.UNAUTHORIZED} state={{ from: location }} replace />
        }

        return children
    }
} 