import { GetCourseQuery } from '@api/generated'
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
import CreateReview from './CreaetReview'
import Review from './Review'

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
   const { isOpen, onOpen, onClose } = useDisclosure()

   return (
      <div className="mt-12 space-y-4">
         <h1 className="text-xl">Отзывы:</h1>

         {currentUser && !currentUserReview && (
            <Button onClick={onOpen} theme="light">
               Оставить отзыв
            </Button>
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

         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Ваш отзыв</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <CreateReview courseId={courseId} onClose={onClose} />
               </ModalBody>
            </ModalContent>
         </Modal>
      </div>
   )
}

export default Reviews
