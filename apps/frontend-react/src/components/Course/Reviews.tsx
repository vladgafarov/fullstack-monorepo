import { GetCourseQuery } from '@api/generated'
import { Modal } from '@mantine/core'
import { useState } from 'react'
import { Button } from 'ui'
import CreateReview from './CreaetReview'
import Review from './Review'
// import Review from './Review'

const Reviews = ({
   reviews,
   currentUser,
   currentUserReview,
   courseId,
}: {
   reviews: GetCourseQuery['course']['reviews']
   currentUser: boolean
   currentUserReview: boolean
   courseId: number
}) => {
   const [isOpen, setIsOpen] = useState<boolean>(false)

   return (
      <div className="mt-12 space-y-4">
         <h1 className="text-xl">Отзывы:</h1>

         {currentUser && !currentUserReview && (
            <Button onClick={() => setIsOpen(true)}>Оставить отзыв</Button>
         )}

         {reviews.length > 0 ? (
            <>
               {reviews.map(review => (
                  <Review review={review} key={review.id} />
               ))}
            </>
         ) : (
            <p>Отзывов еще нет</p>
         )}

         <Modal
            opened={isOpen}
            onClose={() => setIsOpen(false)}
            title={<h2>Ваш отзыв</h2>}
         >
            <CreateReview
               courseId={courseId}
               onClose={() => setIsOpen(false)}
            />
         </Modal>
      </div>
   )
}

export default Reviews
