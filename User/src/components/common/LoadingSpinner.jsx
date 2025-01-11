import { ProgressSpinner } from 'primereact/progressspinner'

const LoadingSpinner = ({ fullScreen = false }) => {
    if (fullScreen) {
        return (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                <ProgressSpinner 
                    style={{ width: '50px', height: '50px' }}
                    strokeWidth="8"
                    fill="var(--surface-ground)"
                    animationDuration=".5s"
                />
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center p-4">
            <ProgressSpinner 
                style={{ width: '40px', height: '40px' }}
                strokeWidth="8"
                fill="var(--surface-ground)"
                animationDuration=".5s"
            />
        </div>
    )
}

export default LoadingSpinner 