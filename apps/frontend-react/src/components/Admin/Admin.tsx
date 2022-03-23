import { FiUser } from 'react-icons/fi'
import { MdOutlineRateReview } from 'react-icons/md'
import { BsCardText } from 'react-icons/bs'
import { Container } from 'ui'
import {
   NavLink,
   Route,
   Routes,
   useLocation,
   useNavigate,
} from 'react-router-dom'
import { useEffect } from 'react'
import AddCourse from './AddCourse'

const Admin = () => {
   const location = useLocation()
   const navigate = useNavigate()

   useEffect(() => {
      if (location.pathname === '/admin') {
         navigate('courses')
      }
   }, [location.pathname])

   if (!!location.pathname.match(/create-course/i)) {
      return (
         <Routes>
            <Route path="/create-course" element={<AddCourse />} />
         </Routes>
      )
   }

   return (
      <Container className="flex space-x-8">
         <div className="basis-1/5 flex flex-col space-y-3">
            <NavLink
               to="courses"
               className={({ isActive }) =>
                  isActive
                     ? 'bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md font-bold flex items-center space-x-1'
                     : 'px-4 py-2 rounded-md hover:bg-blue-200 font-bold flex items-center space-x-1'
               }
            >
               <BsCardText /> <span>Курсы</span>
            </NavLink>
            <NavLink
               to="users"
               className={({ isActive }) =>
                  isActive
                     ? 'bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md font-bold flex items-center space-x-1'
                     : 'px-4 py-2 rounded-md hover:bg-blue-200 font-bold flex items-center space-x-1'
               }
            >
               <FiUser /> <span>Пользователи</span>
            </NavLink>
            <NavLink
               to="reviews"
               className={({ isActive }) =>
                  isActive
                     ? 'bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md font-bold flex items-center space-x-1'
                     : 'px-4 py-2 rounded-md hover:bg-blue-200 font-bold flex items-center space-x-1'
               }
            >
               <MdOutlineRateReview /> <span>Отзывы</span>
            </NavLink>
         </div>
         <div className="basis-4/5">
            <Routes>
               <Route path="/courses" element={<h1>courses</h1>} />
               <Route path="/users" element={<h1>users</h1>} />
               <Route path="/reviews" element={<h1>reviews</h1>} />
            </Routes>
         </div>
      </Container>
   )
}

export default Admin
