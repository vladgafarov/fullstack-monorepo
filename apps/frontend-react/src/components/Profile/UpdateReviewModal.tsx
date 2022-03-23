import { useUpdateReviewMutation } from '@api/generated'
import { Modal } from '@mantine/core'
import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { Button, SetRatingStars } from 'ui'

const UpdateReviewModal = ({ review, isOpen, onClose }) => {
   const [reviewText, setReviewText] = useState<string>(review?.text)
   const [star, setStar] = useState<number>(review.rating - 1)
   const [hoverStar, setHoverStar] = useState<number>(undefined)

   const queryClient = useQueryClient()
   const { mutate, data, isLoading, error } = useUpdateReviewMutation()

   const handleSubmit = e => {
      e.preventDefault()

      mutate(
         {
            id: review.id,
            rating: star + 1,
            text: reviewText,
         },
         {
            onSuccess: data => {
               queryClient.invalidateQueries('CurrentUser')
               queryClient.invalidateQueries([
                  'GetCourse',
                  { id: +data.updateReview.courseId },
               ])
               onClose()
            },
         }
      )
   }

   return (
      <Modal opened={isOpen} onClose={onClose} title="Обновить отзыв">
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
            {error && <p>{JSON.stringify(error)}</p>}
            <Button type="submit" disabled={isNaN(star) || isLoading}>
               Обновить отзыв
            </Button>
         </form>
      </Modal>
   )
}

export default UpdateReviewModal
