import {
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
   useDisclosure,
} from '@chakra-ui/react'
import Button from '@components/utils/Button'
import Container from '@components/utils/Container'
import { useUser } from '@lib/useUser'
import Link from 'next/link'
import { FaEnvelope, FaUser } from 'react-icons/fa'
import ChangePassword from './ChangePassword'

const Profile = () => {
   const { user, isFetching, isLoading } = useUser()
   const { isOpen, onOpen, onClose } = useDisclosure()

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
                     <Link href="/profile/courses">
                        <a className="underline">Курсы:</a>
                     </Link>
                     <h2>{user._count.courses}</h2>
                  </p>
                  <p>
                     <Link href="/profile/reviews">
                        <a className="underline">Отзывов оставлено:</a>
                     </Link>
                     <h2>{user._count.reviews}</h2>
                  </p>
               </div>

               <div className="space-x-3 mt-6">
                  <Button theme="light" onClick={onOpen}>
                     Сменить пароль
                  </Button>
                  <Button theme="redLight">Удалить аккаунт</Button>
               </div>

               <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                     <ModalHeader>Смена пароля</ModalHeader>
                     <ModalCloseButton />
                     <ModalBody>
                        <ChangePassword onClose={onClose} />
                     </ModalBody>
                  </ModalContent>
               </Modal>
            </div>
         )}
      </Container>
   )
}

export default Profile
