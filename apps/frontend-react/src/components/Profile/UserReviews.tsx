import Pagination from '@components/common/Pagination'
import { perPage } from '@lib/config'
import { useUser } from '@lib/useUser'
import { useSearchParams } from 'react-router-dom'
import { Container } from 'ui'
import UserReview from './UserReview'

const UserReviews = () => {
   const [search] = useSearchParams()
   const page = +(search.get('page') ?? 1)

   const { user, isFetching, isLoading, error } = useUser({
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

         {isLoading ? (
            <p>Загрузка...</p>
         ) : error ? (
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
                     <Pagination length={user._count.reviews} page={page} />
                  </>
               )}
            </div>
         )}
      </Container>
   )
}

export default UserReviews
