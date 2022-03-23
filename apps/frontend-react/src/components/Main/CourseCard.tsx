import { Course, useSignUpForCourseMutation } from '@api/generated'
import { Spoiler } from '@mantine/core'
import courseImg from '../../course.jpg'
import { Link } from 'react-router-dom'
import { Button } from 'ui'
import { useQueryClient } from 'react-query'

const CourseCard = ({ data }: { data: Partial<Course> }) => {
   const { mutate, isLoading, error } = useSignUpForCourseMutation()

   const queryClient = useQueryClient()

   const handleSignUp = () => {
      mutate(
         {
            courseId: data.id,
         },
         {
            onSuccess: () => {
               queryClient.invalidateQueries('GetCourses')
            },
         }
      )
   }

   return (
      <div className="group shadow-lg rounded-xl bg-slate-200 basis-1/3 overflow-hidden flex flex-col hover:shadow-xl transition">
         <div className="relative h-36">
            <div className="absolute inset-0 overflow-hidden">
               <img
                  src={data.mainImage || courseImg}
                  alt={data.title}
                  className="
                     object-cover
                     w-full
                     max-h-full
                     group-hover:scale-[110%] transition duration-[2000ms]
                  "
               />
            </div>
            <div className="absolute bottom-0 h-24 w-full bg-gradient-to-t from-slate-500 to-transparent"></div>
         </div>
         <div className="p-4 flex flex-col justify-between flex-grow">
            <div>
               <Link to={`/course/${data.id}`}>
                  <h2 className="underline hover:text-slate-600">
                     {data.title}
                  </h2>
               </Link>
               <Spoiler maxHeight={120} hideLabel="" showLabel="">
                  {data.description}
               </Spoiler>
            </div>
            <div>
               <p className="font-bold py-4 text-green-600">{data.price} ₽</p>
               {data.currentUser ? (
                  <Button disabled>Вы записаны</Button>
               ) : (
                  <Button onClick={handleSignUp} disabled={isLoading}>
                     Записаться
                  </Button>
               )}
            </div>
         </div>
      </div>
   )
}

export default CourseCard
