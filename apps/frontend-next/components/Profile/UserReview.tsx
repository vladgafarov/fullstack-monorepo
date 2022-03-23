import { useDisclosure } from '@chakra-ui/react'
import DeleteReviewModal from '@components/Course/DeleteReviewModal'
import Star from '@components/Course/Star'
import UpdateReviewModal from '@components/Course/UpdateReviewModal'
import { format } from 'date-fns'
import Link from 'next/link'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin7Line } from 'react-icons/ri'

const UserReview = ({ review }) => {
   const {
      isOpen: isUpdateOpen,
      onOpen: onUpdateOpen,
      onClose: onUpdateClose,
   } = useDisclosure()
   const {
      isOpen: isDeleteOpen,
      onOpen: onDeleteOpen,
      onClose: onDeleteClose,
   } = useDisclosure()

   return (
      <>
         <div className="bg-slate-100 py-3 px-4 mb-6 rounded-xl">
            <div className="flex justify-between items-center">
               <div className="flex items-center space-x-2">
                  <Link href={`/course/${review.course.id}`}>
                     <a className="underline font-proxima-medium">
                        {review.course.title}
                     </a>
                  </Link>
                  <span className="text-sm text-slate-500">
                     {format(new Date(review.createdAt), 'dd.MM.Y')}
                  </span>
               </div>
               {review.currentUser && (
                  <div className="flex items-center space-x-2 text-slate-400">
                     <button
                        onClick={onUpdateOpen}
                        className="hover:text-slate-700 cursor-pointer"
                     >
                        <FiEdit />
                     </button>
                     <button
                        onClick={onDeleteOpen}
                        className="hover:text-slate-700 cursor-pointer"
                     >
                        <RiDeleteBin7Line />
                     </button>
                  </div>
               )}
            </div>
            <div className="flex items-center space-x-0.5">
               {Array.from({ length: 5 }, (_, i) => (
                  <Star
                     key={i}
                     className={i < review.rating ? 'fill-orange-400' : ''}
                     isActive={false}
                  />
               ))}
            </div>
            {review.text && (
               <p className={`mt-2 py-2 pl-2 border-l-2 border-green-400`}>
                  {review.text}
               </p>
            )}
         </div>
         <UpdateReviewModal
            review={review}
            isOpen={isUpdateOpen}
            onClose={onUpdateClose}
         />
         <DeleteReviewModal
            id={review.id}
            isOpen={isDeleteOpen}
            onClose={onDeleteClose}
         />
      </>
   )
}

export default UserReview
