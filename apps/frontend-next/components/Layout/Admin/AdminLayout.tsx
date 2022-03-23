import Container from '@components/utils/Container'
import Link from 'next/link'
import { FiUser } from 'react-icons/fi'
import { MdOutlineRateReview } from 'react-icons/md'
import { BsCardText } from 'react-icons/bs'
import { useRouter } from 'next/router'
import classNames from 'classnames'

const links = [
   {
      link: '/admin/courses',
      icon: <BsCardText />,
      text: 'Курсы',
   },
   {
      link: '/admin/users',
      icon: <FiUser />,
      text: 'Пользователи',
   },
   {
      link: '/admin/reviews',
      icon: <MdOutlineRateReview />,
      text: 'Отзывы',
   },
]

const AdminLayout = ({ children }) => {
   const router = useRouter()

   return (
      <Container className="flex space-x-8">
         <div className="basis-1/5 flex flex-col space-y-3">
            {links.map((link, i) => {
               const linkClass = classNames(
                  'px-4 py-2 rounded-md hover:bg-blue-200 font-bold flex items-center space-x-1',
                  {
                     'bg-blue-500 text-white hover:bg-blue-600':
                        link.link === router.pathname,
                  }
               )

               return (
                  <Link href={link.link} key={i}>
                     <a className={linkClass}>
                        {link.icon} <span>{link.text}</span>
                     </a>
                  </Link>
               )
            })}
         </div>
         <div className="basis-4/5">{children}</div>
      </Container>
   )
}

export default AdminLayout
