import Container from '@components/utils/Container'
import CourseCard from '../common/CourseCard'
import Button from '@components/utils/Button'
import { useRouter } from 'next/router'
import { useGetCoursesQuery } from '@api/generated'
import { useUser } from '@lib/useUser'
import CourseCardsWrapper from '@components/common/CourseCardsWrapper'

const Courses = () => {
   const { user } = useUser()
   const { data, isLoading, error, isFetching } = useGetCoursesQuery({
      take: 3,
   })

   const router = useRouter()

   return (
      <Container id="courses">
         <h1 className="text-2xl">Последние курсы</h1>

         {isLoading || isFetching ? (
            <p>Загрузка...</p>
         ) : error ? (
            <p>{JSON.stringify(error)}</p>
         ) : (
            <CourseCardsWrapper>
               {data?.courses?.map(course => (
                  <CourseCard data={course} key={course.id} />
               ))}
            </CourseCardsWrapper>
         )}

         {data?.courses && (
            <div className="text-center mt-10">
               <Button
                  theme="light"
                  onClick={() => {
                     router.push('/courses')
                  }}
               >
                  Посмотреть все курсы
               </Button>
            </div>
         )}
      </Container>
   )
}

export default Courses
