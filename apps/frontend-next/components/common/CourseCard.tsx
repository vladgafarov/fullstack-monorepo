import Button from '@components/utils/Button'
import Image from 'next/image'
import courseImg from '@public/course.jpg'
import { Course, useSignUpForCourseMutation } from '@api/generated'
import DisplayError from '@components/utils/DisplayError'
import { useUser } from '@lib/useUser'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { Text } from '@chakra-ui/react'

const CourseCard = ({ data }: { data: Partial<Course> }) => {
   const [signUpForCourseMutation, { isLoading, error }] =
      useSignUpForCourseMutation()
   const { user } = useUser()

   const signUpForCourse = () => {
      if (user) {
         signUpForCourseMutation({ courseId: data.id })
            .unwrap()
            .then(() => toast.success('Успешно записаны'))
      } else {
         toast.error('Необходимо авторизоваться')
      }
   }

   return (
      <div className="group shadow-lg rounded-xl bg-slate-200 basis-1/3 overflow-hidden flex flex-col hover:shadow-xl transition">
         <div className="relative h-36">
            <Image
               src={data.mainImage || courseImg}
               alt={data.title}
               layout="fill"
               objectFit="cover"
               className="group-hover:scale-[110%] transition duration-[2000ms]"
            />
            <div className="absolute bottom-0 h-24 w-full bg-gradient-to-t from-slate-500 to-transparent"></div>
         </div>
         <div className="p-4 flex flex-col justify-between flex-grow">
            <div>
               <Link href={`/course/${data.id}`}>
                  <a>
                     <h2 className="underline hover:text-slate-600">
                        {data.title}
                     </h2>
                  </a>
               </Link>
               <Text noOfLines={5}>{data.description}</Text>
            </div>
            <div>
               <p className="font-bold py-4 text-green-600">{data.price} ₽</p>
               {error && <DisplayError error={error.message} />}
               {data.currentUser ? (
                  <Button theme="light" disabled>
                     Вы записаны
                  </Button>
               ) : (
                  <Button disabled={isLoading} onClick={signUpForCourse}>
                     Записаться
                  </Button>
               )}
            </div>
         </div>
      </div>
   )
}

export default CourseCard
