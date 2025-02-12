import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from '../../modules/auth/hooks/use-auth-context.hook'

function ProtectedRoute() {
  const { isAuthenticated } = useAuthContext()

  if (!isAuthenticated) return <Navigate to="/" replace />

  return <Outlet />
}

export default ProtectedRoute
