import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { ROUTES } from './constants/routes'
import LoadingSpinner from './components/common/LoadingSpinner'
import useLoading from './hooks/useLoading'
import { RequireAuth, RequireGuest } from './middleware/auth.middleware.jsx'
import { Toast } from 'primereact/toast'
import { useRef, useEffect } from 'react'
import { apiMiddleware } from './middleware/api.middleware.jsx'
import Home from './pages/Home'
import Books from './pages/Books'
import Login from './pages/Login'
const Register = () => <div>Register Page</div> // Placeholder

function App() {
  const isLoading = useLoading((state) => state.isLoading)
  const toast = useRef(null)

  useEffect(() => {
    // Set toast reference for API middleware
    apiMiddleware.setToast(toast)
  }, [])

  return (
    <Router>
      <Toast ref={toast} />
      {isLoading && <LoadingSpinner fullScreen />}
      <Routes>
        <Route path={ROUTES.LOGIN} element={
          <RequireGuest>
            <Login />
          </RequireGuest>
        } />
        <Route path={ROUTES.REGISTER} element={
          <RequireGuest>
            <Register />
          </RequireGuest>
        } />

        <Route path={ROUTES.HOME} element={<MainLayout><Home /></MainLayout>} />

        <Route element={<RequireAuth><MainLayout /></RequireAuth>}>
          <Route path={ROUTES.BOOKS} element={<Books />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
