import { useDeleteReviewMutation } from '@api/generated'
import { Modal } from '@mantine/core'
import { useQueryClient } from 'react-query'
import { Button } from 'ui'

const DeleteReviewModal = ({ id, isOpen, onClose }) => {
   const { mutate, isLoading, error } = useDeleteReviewMutation()

   const queryClient = useQueryClient()

   const handleDelete = () => {
      mutate(
         { id },
         {
            onSuccess: data => {
               queryClient.invalidateQueries('CurrentUser')
               queryClient.invalidateQueries([
                  'GetCourse',
                  { id: +data.removeReview.courseId },
               ])
               onClose()
            },
         }
      )
   }

   return (
      <Modal opened={isOpen} onClose={onClose} title="Удалить отзыв">
         <h2>Вы дейстительно хотите удалить этот отзыв?</h2>
         <p>Отменить это действие будет невозможно</p>

         {error && <p>{JSON.stringify(error)}</p>}

         <Button onClick={handleDelete} disabled={isLoading}>
            Удалить
         </Button>
         <Button onClick={onClose} className="ml-3">
            Отмена
         </Button>
      </Modal>
   )
}

export default DeleteReviewModal
