import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider, useAuth} from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';

const ProtectedRoutes = ({children}) =>{
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" />
}

const App = () => {
  return (
   <AuthProvider>
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/expenses" element={
                <ProtectedRoutes>
                    <h2>Expenses Page Coming Soon</h2>
                </ProtectedRoutes>
            } />
            <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
    </BrowserRouter>
   </AuthProvider>
  )
}
export default App;