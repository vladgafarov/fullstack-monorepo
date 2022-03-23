import { useUser } from '@lib/useUser'
import { Navigate, useLocation } from 'react-router-dom'

const RequireAuth = ({ children }) => {
   const { user } = useUser()
   const location = useLocation()

   if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />
   }

   return children
}

export default RequireAuth
