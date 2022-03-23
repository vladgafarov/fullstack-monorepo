import CourseCardsWrapper from '@components/common/CourseCardsWrapper'
import Pagination from '@components/common/Pagination'
import Container from '@components/utils/Container'
import { perPage } from '@lib/config'
import { useUser } from '@lib/useUser'
import { useRouter } from 'next/router'
import CourseCard from './CourseCard'

const UserCourses = () => {
   const router = useRouter()

   const page = +((router.query.page as string) ?? 1)

   const { user, isFetching, isLoading } = useUser({
      takeCourses: perPage,
      skipCourses: perPage * (page - 1),
   })

   return (
      <Container>
         <h1 className="text-2xl">
            Ваши курсы{' '}
            <span className="text-slate-500 text-base">
               ({user?._count.courses})
            </span>
         </h1>

         {isLoading || isFetching ? (
            <p>Загрузка...</p>
         ) : !user ? (
            <p>Не удалось получить информацию о пользователе</p>
         ) : (
            <>
               {user.courses.length === 0 ? (
                  <p>Вы еще не записаны ни на один курс</p>
               ) : (
                  <>
                     <CourseCardsWrapper>
                        {user.courses.map(course => (
                           <CourseCard data={course} key={course.id} />
                        ))}
                     </CourseCardsWrapper>
                     <Pagination
                        length={user._count.courses}
                        link="/profile/courses"
                     />
                  </>
               )}
            </>
         )}
      </Container>
   )
}

export default UserCourses
