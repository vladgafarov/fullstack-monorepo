import { client } from '@api/client'
import { useGetCoursesQuery } from '@api/generated'
import { SimpleGrid } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { Button, Container } from 'ui'
import CourseCard from './CourseCard'

const Courses = () => {
   const navigate = useNavigate()

   const { data, error, isLoading, isFetching } = useGetCoursesQuery(
      {
         take: 3,
      },
      {
         retry: false,
      }
   )

   return (
      <Container id="courses">
         <h1 className="text-2xl">Последние курсы</h1>

         {isLoading ? (
            <p>Загрузка...</p>
         ) : error ? (
            <p>{JSON.stringify(error)}</p>
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
                  {data.courses.map(course => (
                     <CourseCard key={course.id} data={course} />
                  ))}
               </SimpleGrid>
               <Button
                  onClick={() => navigate('/courses')}
                  variant="outline"
                  className="mx-auto block"
               >
                  Посмотреть все курсы
               </Button>
            </>
         )}
      </Container>
   )
}

export default Courses
