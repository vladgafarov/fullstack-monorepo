import Pagination from '@components/common/Pagination'
import Container from '@components/utils/Container'
import { perPage } from '@lib/config'
import { useUser } from '@lib/useUser'
import { useRouter } from 'next/router'
import UserReview from './UserReview'

const UserReviews = () => {
   const router = useRouter()

   const page = +((router.query.page as string) ?? 1)

   const { user, isFetching, isLoading } = useUser({
      takeReviews: perPage,
      skipReviews: perPage * (page - 1),
   })

   return (
      <Container>
         <h1 className="text-2xl">
            Ваши отзывы{' '}
            <span className="text-slate-500 text-base">
               ({user?._count.reviews})
            </span>
         </h1>

         {isLoading || isFetching ? (
            <p>Загрузка...</p>
         ) : !user ? (
            <p>Не удалось получить информацию о пользователе</p>
         ) : (
            <div className="mt-6">
               {user.reviews.length === 0 ? (
                  <p>Вы еще не оставляли отзывов о курсах</p>
               ) : (
                  <>
                     {user.reviews.map(review => (
                        <UserReview key={review.id} review={review} />
                     ))}
                     <Pagination
                        length={user._count.reviews}
                        link="/profile/reviews"
                     />
                  </>
               )}
            </div>
         )}
      </Container>
   )
}

export default UserReviews
