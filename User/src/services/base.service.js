import axios from 'axios'
import useLoading from '../hooks/useLoading'
import { API_CONFIG } from '../config/api.config'
import { apiMiddleware } from '../middleware/api.middleware.jsx'

const createBaseService = (resourcePath) => {
    const { showLoading, hideLoading } = useLoading.getState()

    // Create axios instance
    const axiosInstance = axios.create({
        baseURL: API_CONFIG.BASE_URL,
        timeout: API_CONFIG.TIMEOUT
    })

    // Add request interceptor
    axiosInstance.interceptors.request.use(
        apiMiddleware.requestMiddleware,
        apiMiddleware.errorMiddleware
    )

    // Add response interceptor
    axiosInstance.interceptors.response.use(
        apiMiddleware.responseMiddleware,
        apiMiddleware.errorMiddleware
    )

    // Get auth token
    const getAuthToken = () => {
        return localStorage.getItem('token')
    }

    // Get headers with auth token
    const getHeaders = (customHeaders = {}, isFormData = false) => {
        const token = getAuthToken()
        const headers = {
            'Accept': 'application/json',
            ...(!isFormData && { 'Content-Type': 'application/json' }),
            ...customHeaders
        }

        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }

        return headers
    }

    // Handle API Response
    const handleResponse = (response) => {
        return response.data
    }

    // Handle API Error
    const handleError = (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
        throw error
    }

    // GET request
    const get = async (endpoint = '', params = {}, customHeaders = {}) => {
        try {
            showLoading()
            const response = await axiosInstance.get(`${resourcePath}${endpoint}`, {
                params,
                headers: getHeaders(customHeaders)
            })
            return handleResponse(response)
        } catch (error) {
            handleError(error)
        } finally {
            hideLoading()
        }
    }

    // POST request
    const post = async (endpoint = '', data = {}, customHeaders = {}) => {
        try {
            showLoading()
            const isFormData = data instanceof FormData
            const headers = getHeaders(customHeaders, isFormData)
            const processedData = isFormData ? data : data

            const response = await axiosInstance.post(`${resourcePath}${endpoint}`, processedData, {
                headers
            })
            return handleResponse(response)
        } catch (error) {
            handleError(error)
        } finally {
            hideLoading()
        }
    }

    // PUT request
    const put = async (endpoint = '', data = {}, customHeaders = {}) => {
        try {
            showLoading()
            const isFormData = data instanceof FormData
            const headers = getHeaders(customHeaders, isFormData)
            const processedData = isFormData ? data : data

            const response = await axiosInstance.put(`${resourcePath}${endpoint}`, processedData, {
                headers
            })
            return handleResponse(response)
        } catch (error) {
            handleError(error)
        } finally {
            hideLoading()
        }
    }

    // DELETE request
    const deleteRequest = async (endpoint = '', customHeaders = {}) => {
        try {
            showLoading()
            const response = await axiosInstance.delete(`${resourcePath}${endpoint}`, {
                headers: getHeaders(customHeaders)
            })
            return handleResponse(response)
        } catch (error) {
            handleError(error)
        } finally {
            hideLoading()
        }
    }

    // PATCH request
    const patch = async (endpoint = '', data = {}, customHeaders = {}) => {
        try {
            showLoading()
            const response = await axiosInstance.patch(`${resourcePath}${endpoint}`, data, {
                headers: getHeaders(customHeaders)
            })
            return handleResponse(response)
        } catch (error) {
            handleError(error)
        } finally {
            hideLoading()
        }
    }

    return {
        get,
        post,
        put,
        delete: deleteRequest,
        patch,
        getAuthToken,
        getHeaders
    }
}

export default createBaseService 