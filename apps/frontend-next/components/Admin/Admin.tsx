import Container from '@components/utils/Container'
import Link from 'next/link'
import { FiUser } from 'react-icons/fi'
import { MdOutlineRateReview } from 'react-icons/md'
import { BsCardText } from 'react-icons/bs'
import { useRouter } from 'next/router'

const Admin = () => {
   const router = useRouter()

   return (
      <Container className="flex">
         <div className="basis-1/5 flex flex-col space-y-3">
            <Link href="/admin/courses">
               <a className="px-4 py-2 rounded-md hover:bg-blue-200 font-proxima-medium">
                  <BsCardText /> Курсы
               </a>
            </Link>
            <Link href="/admin/users">
               <a className="px-4 py-2 rounded-md hover:bg-blue-200 font-proxima-medium">
                  <FiUser /> Пользователи
               </a>
            </Link>
            <Link href="/admin/reviews">
               <a className="px-4 py-2 rounded-md hover:bg-blue-200 font-proxima-medium">
                  <MdOutlineRateReview /> Отзывы
               </a>
            </Link>
         </div>
         <div className="basis-4/5"></div>
      </Container>
   )
}

export default Admin
