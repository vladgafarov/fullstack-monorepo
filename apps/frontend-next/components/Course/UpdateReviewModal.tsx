import { useUpdateReviewMutation } from '@api/generated'
import {
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
} from '@chakra-ui/react'
import Button from '@components/utils/Button'
import DisplayError from '@components/utils/DisplayError'
import { useState } from 'react'
import toast from 'react-hot-toast'
import SetRatingStars from './SetRatingStars'

const UpdateReviewModal = ({ isOpen, onClose, review }) => {
   const [reviewText, setReviewText] = useState<string>(review.text)
   const [star, setStar] = useState<number>(review.rating - 1)
   const [hoverStar, setHoverStar] = useState<number>(undefined)

   const [updateReview, { data, isLoading, error }] = useUpdateReviewMutation()

   const handleSubmit = e => {
      e.preventDefault()

      if (isNaN(star)) {
         toast.error('Необходимо поставить рейтинг')
         return
      }

      updateReview({
         id: review.id,
         rating: star + 1,
         text: reviewText,
      })
         .unwrap()
         .then(() => {
            toast.success('Отзыв успешно обновлен')
            onClose()
         })
         .catch(err => {})
   }

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Редактировать отзыв</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
               <SetRatingStars
                  star={star}
                  hoverStar={hoverStar}
                  setStar={setStar}
                  setHoverStar={setHoverStar}
               />

               <form
                  className="flex flex-col items-start space-y-3 mb-6"
                  onSubmit={handleSubmit}
               >
                  <textarea
                     value={reviewText}
                     onChange={e => setReviewText(e.target.value)}
                     className="border-2 border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none w-full h-24 py-2 px-3"
                  ></textarea>
                  {error && <DisplayError error={error} />}
                  <Button disabled={isNaN(star) || isLoading}>
                     Обновить отзыв
                  </Button>
               </form>
            </ModalBody>
         </ModalContent>
      </Modal>
   )
}

export default UpdateReviewModal
