import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { useRef } from 'react'
import authService from '../services/auth.service'
import { ROUTES } from '../constants/routes'

const Login = () => {
    const navigate = useNavigate()
    const toast = useRef(null)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // const response = await authService.login(formData)
            // const userProfile = await authService.getCurrentUser()
            
            toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Login successful',
                life: 3000
            })

            // Chuyển hướng sau khi login thành công
            navigate(ROUTES.HOME)
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: error.message || 'Login failed',
                life: 3000
            })
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Toast ref={toast} />
            <Card title="Login" className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                        <InputText
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password">Password</label>
                        <Password
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            feedback={false}
                            required
                        />
                    </div>

                    <Button 
                        type="submit" 
                        label="Login"
                        icon="pi pi-sign-in"
                    />
                </form>
            </Card>
        </div>
    )
}

export default Login 