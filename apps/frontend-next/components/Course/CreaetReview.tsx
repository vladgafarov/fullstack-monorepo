import { useCreateReviewMutation } from '@api/generated'
import Button from '@components/utils/Button'
import DisplayError from '@components/utils/DisplayError'
import { useState } from 'react'
import toast from 'react-hot-toast'
import SetRatingStars from './SetRatingStars'

const CreateReview = ({ courseId, onClose }: { courseId: number; onClose }) => {
   const [review, setReview] = useState<string>()
   const [star, setStar] = useState<number>()
   const [hoverStar, setHoverStar] = useState<number>(undefined)

   const [createReviewMutation, { data, isLoading, error }] =
      useCreateReviewMutation()

   const createReview = e => {
      e.preventDefault()

      if (isNaN(star)) {
         toast.error('Необходимо поставить рейтинг')
         return
      }

      createReviewMutation({
         courseId,
         rating: star + 1,
         text: review,
      })
         .unwrap()
         .then(() => {
            toast.success('Отзыв успешно добавлен')
            onClose()
         })
         .catch(err => toast.error('Не удалось добавить отзыв'))
   }

   return (
      <div>
         <SetRatingStars
            star={star}
            hoverStar={hoverStar}
            setStar={setStar}
            setHoverStar={setHoverStar}
         />

         <form
            className="flex flex-col items-start space-y-3 mb-6"
            onSubmit={createReview}
         >
            <textarea
               value={review}
               onChange={e => setReview(e.target.value)}
               className="border-2 border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none w-full h-24 py-2 px-3"
            ></textarea>
            {error && <DisplayError error={error} />}
            <Button disabled={isNaN(star)}>Оставить отзыв</Button>
         </form>
      </div>
   )
}

export default CreateReview
