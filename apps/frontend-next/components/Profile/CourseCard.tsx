import Image from 'next/image'
import courseImg from '@public/course.jpg'
import { Course } from '@api/enhanceApi'
import Link from 'next/link'
import { Text } from '@chakra-ui/react'

const CourseCard = ({ data }: { data: Partial<Course> }) => {
   return (
      <div className="shadow-lg rounded-xl bg-slate-200 basis-1/3 overflow-hidden flex flex-col">
         <div className="relative h-36">
            <Image
               src={data.mainImage || courseImg}
               alt={data.title}
               layout="fill"
               objectFit="cover"
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
         </div>
      </div>
   )
}

export default CourseCard
