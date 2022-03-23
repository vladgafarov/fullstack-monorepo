import Container from '@components/utils/Container'
import CourseCard from '@components/common/CourseCard'
import { useGetCoursesQuery } from '@api/generated'
import CourseCardsWrapper from '@components/common/CourseCardsWrapper'
import Pagination from '../common/Pagination'
import { perPage } from '@lib/config'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CourseOrderBy, SortOrder } from '@api/enhanceApi'
import Select from 'react-select'
import Button from '@components/utils/Button'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'

const optionsOrderBy: {
   value: CourseOrderBy
   label: string
}[] = [
   { value: CourseOrderBy.CreatedAt, label: 'Дата добавления' },
   { value: CourseOrderBy.Price, label: 'Цена' },
   { value: CourseOrderBy.Rating, label: 'Рейтинг' },
]

const Courses = () => {
   const router = useRouter()

   const page = +((router.query.page as string) ?? 1)

   const [orderBy, setOrderBy] = useState<CourseOrderBy>(
      CourseOrderBy.CreatedAt
   )
   const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Desc)

   const { data, isLoading, error, isFetching } = useGetCoursesQuery({
      take: perPage,
      skip: perPage * (page - 1),
      orderBy,
      sortOrder,
   })

   return (
      <Container>
         <h1 className="text-2xl">
            Курсы
            <span className="text-slate-500 text-base pl-1">
               ({data?.courses[0]?.count})
            </span>
         </h1>

         <div className="flex items-center space-x-2 mt-3">
            <Select
               options={optionsOrderBy}
               value={{
                  value: orderBy,
                  label: optionsOrderBy.find(i => i.value === orderBy).label,
               }}
               onChange={value => {
                  setOrderBy(value.value)
               }}
               isSearchable={false}
               className="min-w-[260px]"
               styles={{
                  control: (provided, state) => ({
                     ...provided,
                     border: '2px solid #3b82f6',
                  }),
               }}
            />
            <Button
               theme="light"
               onClick={() => {
                  setSortOrder(prev => {
                     if (prev === SortOrder.Desc) return SortOrder.Asc
                     return SortOrder.Desc
                  })
               }}
            >
               {sortOrder === SortOrder.Desc ? <FaArrowDown /> : <FaArrowUp />}
            </Button>
         </div>

         {isLoading || isFetching ? (
            <p>Загрузка...</p>
         ) : error ? (
            <p>{JSON.stringify(error)}</p>
         ) : (
            <>
               <CourseCardsWrapper>
                  {data.courses.map(course => (
                     <CourseCard data={course} key={course.id} />
                  ))}
               </CourseCardsWrapper>
               <Pagination length={data.courses[0]?.count} link="/courses" />
            </>
         )}
      </Container>
   )
}

export default Courses
