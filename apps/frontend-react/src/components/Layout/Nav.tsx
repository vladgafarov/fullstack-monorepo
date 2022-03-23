import { useLogOutMutation, UserRole } from '@api/generated'
import { useUser } from '@lib/useUser'
import { Menu, Modal } from '@mantine/core'
import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'ui'
import Search from './Search'

const Nav = () => {
   const [isOpen, setIsOpen] = useState<boolean>(false)

   const onOpen = () => setIsOpen(true)
   const onClose = () => setIsOpen(false)

   const navigate = useNavigate()
   const { user } = useUser()

   const queryClient = useQueryClient()

   const { mutate, error, isLoading } = useLogOutMutation({
      onSuccess: () => {
         queryClient.invalidateQueries('CurrentUser')
      },
   })

   return (
      <>
         <nav className="flex items-center space-x-3">
            {user?.role === UserRole.Admin && (
               <>
                  <Link
                     to="/admin/create-course"
                     className="font-proxima-medium"
                  >
                     Добавить курс
                  </Link>
                  <Link to="/admin" className="font-proxima-medium">
                     Админ-панель
                  </Link>
               </>
            )}
            <button onClick={onOpen} className="text-xl">
               <BiSearch />
            </button>
            <Link to="/courses" className="font-proxima-medium">
               Курсы
            </Link>
            <div className="space-x-3">
               {user ? (
                  <Menu
                     control={
                        <h2 className="hover:underline hover:decoration-green-500">
                           {user.name} {user.lastName}
                        </h2>
                     }
                     transition="rotate-right"
                  >
                     <Menu.Item
                        onClick={() => navigate('/profile')}
                        className="hover:bg-blue-100"
                     >
                        Профиль
                     </Menu.Item>
                     <Menu.Item
                        onClick={() => {
                           mutate(null)
                        }}
                        className="hover:bg-blue-100"
                     >
                        Выйти
                     </Menu.Item>
                  </Menu>
               ) : (
                  <>
                     <Button onClick={() => navigate('/login')}>Вход</Button>
                     <Button
                        onClick={() => navigate('/signup')}
                        variant="outline"
                     >
                        Регистрация
                     </Button>
                  </>
               )}
            </div>
         </nav>
         <Modal onClose={onClose} opened={isOpen} title={<h2>Поиск</h2>}>
            <Search onClose={onClose} />
         </Modal>
      </>
   )
}

export default Nav
