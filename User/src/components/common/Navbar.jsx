import { useNavigate } from 'react-router-dom'
import { Menubar } from 'primereact/menubar'
import { Button } from 'primereact/button'
import { Avatar } from 'primereact/avatar'
import { Badge } from 'primereact/badge'
import { ROUTES } from '../../constants/routes'
import authService from '../../services/auth.service'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeSwitcher from './ThemeSwitcher'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
    const navigate = useNavigate()
    const isAuthenticated = authService.isAuthenticated()
    const { t } = useTranslation()

    const start = (
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(ROUTES.HOME)}>
            <i className="pi pi-book text-2xl text-primary dark:text-blue-400"></i>
            <span className="text-xl font-bold dark:text-white">BookLib</span>
        </div>
    )

    const items = [
        {
            label: t('common.home'),
            icon: 'pi pi-home',
            className: 'dark:text-gray-200',
            command: () => navigate(ROUTES.HOME)
        },
        {
            label: t('common.browse'),
            icon: 'pi pi-search',
            className: 'dark:text-gray-200',
            items: [
                {
                    label: t('common.all_books'),
                    icon: 'pi pi-book',
                    className: 'dark:text-gray-200',
                    command: () => navigate(ROUTES.BOOKS)
                },
                {
                    label: t('common.categories'),
                    icon: 'pi pi-tags',
                    className: 'dark:text-gray-200',
                    items: [
                        {
                            label: t('categories.fiction'),
                            icon: 'pi pi-bookmark',
                            className: 'dark:text-gray-200'
                        },
                        {
                            label: t('categories.non_fiction'),
                            icon: 'pi pi-bookmark',
                            className: 'dark:text-gray-200'
                        },
                        {
                            label: t('categories.science'),
                            icon: 'pi pi-bookmark',
                            className: 'dark:text-gray-200'
                        }
                    ]
                },
                {
                    separator: true
                },
                {
                    label: t('common.new_releases'),
                    icon: 'pi pi-star',
                    className: 'dark:text-gray-200'
                }
            ]
        },
        {
            label: t('common.about'),
            icon: 'pi pi-info-circle',
            className: 'dark:text-gray-200'
        }
    ]

    const userMenuItems = [
        {
            label: t('common.profile'),
            icon: 'pi pi-user',
            className: 'dark:text-gray-200',
            command: () => navigate(ROUTES.PROFILE)
        },
        {
            label: t('common.my_books'),
            icon: 'pi pi-book',
            className: 'dark:text-gray-200',
            badge: '3'
        },
        {
            label: t('common.settings'),
            icon: 'pi pi-cog',
            className: 'dark:text-gray-200'
        },
        {
            separator: true
        },
        {
            label: t('common.logout'),
            icon: 'pi pi-power-off',
            className: 'dark:text-gray-200',
            command: () => {
                authService.logout()
                navigate(ROUTES.LOGIN)
            }
        }
    ]

    const authenticatedEnd = (
        <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <div className="relative">
                <i className="pi pi-bell text-xl cursor-pointer p-overlay-badge dark:text-gray-200">
                    <Badge value="2" severity="danger"></Badge>
                </i>
            </div>
            <Menubar
                model={userMenuItems}
                className="border-none bg-transparent dark:bg-gray-800"
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
        <div className="flex gap-2 items-center">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <Button 
                label={t('common.login')}
                icon="pi pi-sign-in" 
                className="p-button-text dark:text-gray-200" 
                onClick={() => navigate(ROUTES.LOGIN)}
            />
            <Button 
                label={t('common.register')}
                icon="pi pi-user-plus" 
                severity="info"
                onClick={() => navigate(ROUTES.REGISTER)}
            />
        </div>
    )

    return (
        <header className="shadow-md bg-white dark:bg-gray-800 sticky top-0 z-50 transition-colors duration-200">
            <div className="container mx-auto px-4">
                <Menubar
                    model={items}
                    start={start}
                    end={isAuthenticated ? authenticatedEnd : guestEnd}
                    className="border-none !p-0 dark:bg-gray-800"
                    style={{ background: 'transparent' }}
                />
            </div>
        </header>
    )
}

export default Navbar 