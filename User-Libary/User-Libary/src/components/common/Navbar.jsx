import { useNavigate } from 'react-router-dom'
import { Menubar } from 'primereact/menubar'
import { Button } from 'primereact/button'
import { ROUTES } from '../../constants/routes'

const Navbar = () => {
    const navigate = useNavigate()

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => navigate(ROUTES.HOME)
        },
        {
            label: 'Books',
            icon: 'pi pi-book',
            command: () => navigate(ROUTES.BOOKS)
        }
    ]

    const end = (
        <div className="flex gap-2">
            <Button 
                label="Login" 
                icon="pi pi-sign-in" 
                className="p-button-text" 
                onClick={() => navigate(ROUTES.LOGIN)}
            />
            <Button 
                label="Register" 
                icon="pi pi-user-plus" 
                onClick={() => navigate(ROUTES.REGISTER)}
            />
        </div>
    )

    return (
        <header className="shadow-md">
            <Menubar model={items} end={end} />
        </header>
    )
}

export default Navbar 