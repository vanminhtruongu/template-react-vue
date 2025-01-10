import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { ROUTES } from './constants/routes'

// Import pages
const Home = () => <div>Home Page</div> // Placeholder
const Books = () => <div>Books Page</div> // Placeholder
const Login = () => <div>Login Page</div> // Placeholder
const Register = () => <div>Register Page</div> // Placeholder

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.BOOKS} element={<Books />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
