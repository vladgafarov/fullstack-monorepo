import { useCreateReviewMutation } from '@api/generated'
import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { Button, DisplayError, SetRatingStars } from 'ui'

const CreateReview = ({ courseId, onClose }: { courseId: number; onClose }) => {
   const [review, setReview] = useState<string>()
   const [star, setStar] = useState<number>()
   const [hoverStar, setHoverStar] = useState<number>(undefined)

   const { mutate, isLoading, error } = useCreateReviewMutation()
   const queryClient = useQueryClient()

   const createReview = e => {
      e.preventDefault()

      mutate(
         {
            courseId,
            rating: star + 1,
            text: review,
         },
         {
            onSuccess: () => {
               queryClient.invalidateQueries(['GetCourse', { id: courseId }])
               onClose()
            },
         }
      )
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
            <Button type="submit" disabled={isNaN(star) || isLoading}>
               Оставить отзыв
            </Button>
         </form>
      </div>
   )
}

export default CreateReview
