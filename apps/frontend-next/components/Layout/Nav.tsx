import { useLogOutMutation } from '@api/enhanceApi'
import Button from '@components/utils/Button'
import { useUser } from '@lib/useUser'
import Link from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import {
   Popover,
   PopoverTrigger,
   PopoverContent,
   PopoverBody,
   useDisclosure,
} from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'
import SearchModal from './SearchModal'
import { UserRole } from '@api/enhanceApi'

const Nav = () => {
   const router = useRouter()
   const { user, isLoading: isUserLoading } = useUser()
   const { isOpen, onClose, onOpen } = useDisclosure()

   const [logOut, { isLoading, data, error }] = useLogOutMutation()

   return (
      <>
         <nav className="flex flex-row items-center space-x-6">
            <div className="flex items-center space-x-4">
               <button onClick={onOpen} className="text-xl">
                  <BiSearch />
               </button>
               <Link href="/courses">
                  <a className="font-proxima-medium">Курсы</a>
               </Link>
               {user?.role === UserRole.Admin && (
                  <>
                     <Link href="/admin/add-course">
                        <a className="font-proxima-medium">Добавить курс</a>
                     </Link>
                     <Link href="/admin/courses">
                        <a className="font-proxima-medium">Админ-панель</a>
                     </Link>
                  </>
               )}
            </div>
            <div className="space-x-3">
               {user ? (
                  <div className="flex items-center space-x-3">
                     <Popover placement="bottom-end">
                        <PopoverTrigger>
                           <h2 className="cursor-pointer">
                              {user.name} {user.lastName}
                           </h2>
                        </PopoverTrigger>
                        <PopoverContent className="max-w-min pr-8">
                           <PopoverBody className="flex flex-col items-start space-y-3 font-proxima-medium">
                              <Link href="/profile">
                                 <a className="font-proxima-medium hover:text-slate-600">
                                    Профиль
                                 </a>
                              </Link>
                              <button
                                 className="hover:text-slate-600"
                                 onClick={() => {
                                    logOut()
                                       .unwrap()
                                       .then(() => {
                                          toast.success('Успешно вышли')
                                       })
                                       .catch(err =>
                                          toast.error('Не удалось выйти')
                                       )
                                 }}
                                 disabled={isLoading}
                              >
                                 Выйти
                              </button>
                           </PopoverBody>
                        </PopoverContent>
                     </Popover>
                  </div>
               ) : isUserLoading ? (
                  <p>...</p>
               ) : (
                  <>
                     <Button onClick={() => router.push('/login')}>Вход</Button>
                     <Button
                        theme="light"
                        onClick={() => router.push('/signup')}
                     >
                        Регистрация
                     </Button>
                  </>
               )}
            </div>
         </nav>
         <SearchModal isOpen={isOpen} onClose={onClose} />
      </>
   )
}

export default Nav
