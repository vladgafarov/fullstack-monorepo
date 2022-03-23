import { UserRole } from '@api/generated'
import { useUser } from '@lib/useUser'
import { Navigate, useLocation } from 'react-router-dom'

const RequireAdmin = ({ children }) => {
   const { user } = useUser()
   const location = useLocation()

   if (!user || user.role !== UserRole.Admin) {
      return <Navigate to="/login" state={{ from: location }} replace />
   }

   return children
}

export default RequireAdmin
