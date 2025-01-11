import { useNavigate } from 'react-router-dom'
import { Menubar } from 'primereact/menubar'
import { Button } from 'primereact/button'
import { Avatar } from 'primereact/avatar'
import { Badge } from 'primereact/badge'
import { ROUTES } from '../../constants/routes'
import authService from '../../services/auth.service'

const Navbar = () => {
    const navigate = useNavigate()
    const isAuthenticated = authService.isAuthenticated()

    const start = (
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(ROUTES.HOME)}>
            <i className="pi pi-book text-2xl text-primary"></i>
            <span className="text-xl font-bold">BookLib</span>
        </div>
    )

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => navigate(ROUTES.HOME)
        },
        {
            label: 'Browse',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'All Books',
                    icon: 'pi pi-book',
                    command: () => navigate(ROUTES.BOOKS)
                },
                {
                    label: 'Categories',
                    icon: 'pi pi-tags',
                    items: [
                        {
                            label: 'Fiction',
                            icon: 'pi pi-bookmark'
                        },
                        {
                            label: 'Non-Fiction',
                            icon: 'pi pi-bookmark'
                        },
                        {
                            label: 'Science',
                            icon: 'pi pi-bookmark'
                        }
                    ]
                },
                {
                    separator: true
                },
                {
                    label: 'New Releases',
                    icon: 'pi pi-star'
                }
            ]
        },
        {
            label: 'About',
            icon: 'pi pi-info-circle'
        }
    ]

    const userMenuItems = [
        {
            label: 'Profile',
            icon: 'pi pi-user',
            command: () => navigate(ROUTES.PROFILE)
        },
        {
            label: 'My Books',
            icon: 'pi pi-book',
            badge: '3'
        },
        {
            label: 'Settings',
            icon: 'pi pi-cog'
        },
        {
            separator: true
        },
        {
            label: 'Logout',
            icon: 'pi pi-power-off',
            command: () => {
                authService.logout()
                navigate(ROUTES.LOGIN)
            }
        }
    ]

    const authenticatedEnd = (
        <div className="flex items-center gap-4">
            <div className="relative">
                <i className="pi pi-bell text-xl cursor-pointer p-overlay-badge">
                    <Badge value="2" severity="danger"></Badge>
                </i>
            </div>
            <Menubar
                model={userMenuItems}
                className="border-none bg-transparent"
                start={
                    <Avatar
                        image="https://ui-avatars.com/api/?background=random"
                        shape="circle"
                        className="cursor-pointer"
                    />
                }
            />
        </div>
    )

    const guestEnd = (
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
                severity="info"
                onClick={() => navigate(ROUTES.REGISTER)}
            />
        </div>
    )

    return (
        <header className="shadow-md bg-white sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <Menubar
                    model={items}
                    start={start}
                    end={isAuthenticated ? authenticatedEnd : guestEnd}
                    className="border-none !p-0"
                    style={{ background: 'transparent' }}
                />
            </div>
        </header>
    )
}

export default Navbar 