import React from 'react';
import { Button } from 'primereact/button';
import { useTheme } from '../../hooks/useTheme';

const ThemeSwitcher = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <Button
            icon={isDarkMode ? 'pi pi-sun' : 'pi pi-moon'}
            rounded
            text
            severity="secondary"
            aria-label="Theme Switcher"
            onClick={toggleTheme}
            className="transition-colors duration-200"
            tooltip={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            tooltipOptions={{ position: 'bottom' }}
        />
    );
};

export default ThemeSwitcher; 