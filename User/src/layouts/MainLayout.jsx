import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col dark:bg-gray-900">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8 dark:text-gray-200">
                {children || <Outlet />}
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout 