import { useEffect } from 'react'
import useLoading from '../hooks/useLoading'
import { Button } from 'primereact/button'

const Home = () => {
    const { showLoading, hideLoading } = useLoading()

    const simulateLoading = () => {
        showLoading()
        // Simulate API call
        setTimeout(() => {
            hideLoading()
        }, 2000)
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold">Welcome to Library App</h1>
            <Button 
                label="Test Loading" 
                icon="pi pi-spin pi-spinner"
                onClick={simulateLoading}
            />
        </div>
    )
}

export default Home 