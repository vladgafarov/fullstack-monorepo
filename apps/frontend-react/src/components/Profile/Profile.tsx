import { useUser } from '@lib/useUser'
import { FaEnvelope, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Button, Container } from 'ui'

const Profile = () => {
   const { user, isLoading, isFetching } = useUser()

   return (
      <Container>
         <h1 className="text-2xl">Профиль</h1>

         {isLoading || isFetching ? (
            <p>Загрузка...</p>
         ) : !user ? (
            <p>Не удалось получить информацию о пользователе</p>
         ) : (
            <div className="mt-6">
               <div className="flex items-center space-x-2">
                  <FaUser className="fill-slate-500" />
                  <h2>{`${user.name} ${user.lastName}`}</h2>
               </div>
               <div className="flex items-center space-x-2">
                  <FaEnvelope className="fill-slate-500" />
                  <h2>{user.email}</h2>
               </div>

               <div className="mt-6">
                  <p>
                     <Link to="/profile/courses" className="underline">
                        Курсы:
                     </Link>{' '}
                     <strong>{user._count.courses}</strong>
                  </p>
                  <p>
                     <Link to="/profile/reviews" className="underline">
                        Отзывов оставлено:
                     </Link>{' '}
                     <strong>{user._count.reviews}</strong>
                  </p>
               </div>

               <div className="space-x-3 mt-6">
                  <Button /*onClick={onOpen} */>Сменить пароль</Button>
                  <Button>Удалить аккаунт</Button>
               </div>

               {/* <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                     <ModalHeader>Смена пароля</ModalHeader>
                     <ModalCloseButton />
                     <ModalBody>
                        <ChangePassword onClose={onClose} />
                     </ModalBody>
                  </ModalContent>
               </Modal> */}
            </div>
         )}
      </Container>
   )
}

export default Profile
