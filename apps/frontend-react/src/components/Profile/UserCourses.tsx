import Pagination from '@components/common/Pagination'
import { perPage } from '@lib/config'
import { useUser } from '@lib/useUser'
import { SimpleGrid } from '@mantine/core'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container } from 'ui'
import CourseCard from './CourseCard'

const UserCourses = () => {
   const [search] = useSearchParams()
   const page = +(search.get('page') ?? 1)

   const { user, isLoading, isFetching, error } = useUser({
      takeCourses: perPage,
      skipCourses: perPage * (page - 1),
   })

   const count = useMemo(() => user?._count.courses, [user?._count.courses])

   return (
      <Container>
         <h1 className="text-2xl">
            Ваши курсы{' '}
            <span className="text-slate-500 text-base">({count})</span>
         </h1>

         {isLoading ? (
            <p>Загрузка...</p>
         ) : error ? (
            <p>Не удалось получить информацию о пользователе</p>
         ) : (
            <>
               {user.courses.length === 0 ? (
                  <p>Вы еще не записаны ни на один курс</p>
               ) : (
                  <>
                     <SimpleGrid
                        breakpoints={[
                           { minWidth: 'xs', cols: 1 },
                           { minWidth: 'md', cols: 2 },
                           { minWidth: 'lg', cols: 3 },
                        ]}
                        className="gap-8 my-6"
                     >
                        {user?.courses?.map(course => (
                           <CourseCard data={course} key={course.id} />
                        ))}
                     </SimpleGrid>
                     <Pagination length={user._count.courses} page={page} />
                  </>
               )}
            </>
         )}
      </Container>
   )
}

export default UserCourses
