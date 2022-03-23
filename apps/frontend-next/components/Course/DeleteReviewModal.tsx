import { useDeleteReviewMutation } from '@api/generated'
import {
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
   ModalFooter,
} from '@chakra-ui/react'
import Button from '@components/utils/Button'
import DisplayError from '@components/utils/DisplayError'
import toast from 'react-hot-toast'

const DeleteReviewModal = ({ isOpen, onClose, id }) => {
   const [deleteReview, { isLoading, data, error }] = useDeleteReviewMutation()

   const handleDelete = () => {
      deleteReview({ id })
         .unwrap()
         .then(() => toast.success('Отзыв успешно удален'))
         .catch(err => {})
   }

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Удаление отзыва</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
               <h2>Вы дейстительно хотите удалить этот отзыв?</h2>
               <p>Отменить это действие будет невозможно</p>
            </ModalBody>
            <ModalFooter>
               {error && <DisplayError error={error} />}
               <Button onClick={handleDelete} disabled={isLoading} theme="red">
                  Удалить
               </Button>
               <Button onClick={onClose} className="ml-3">
                  Отмена
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   )
}

export default DeleteReviewModal
