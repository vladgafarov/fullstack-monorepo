import { CourseOrderBy, SortOrder, useGetCoursesQuery } from '@api/generated'
import Pagination from '@components/common/Pagination'
import CourseCard from '@components/Main/CourseCard'
import { Select, SimpleGrid } from '@mantine/core'
import { useMemo, useState } from 'react'
import { Button, Container } from 'ui'
import { perPage } from '@lib/config'
import { useSearchParams } from 'react-router-dom'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

const optionsOrderBy: {
   value: CourseOrderBy
   label: string
}[] = [
   { value: CourseOrderBy.CreatedAt, label: 'Дата добавления' },
   { value: CourseOrderBy.Price, label: 'Цена' },
   { value: CourseOrderBy.Rating, label: 'Рейтинг' },
]

const AllCourses = () => {
   const [search] = useSearchParams()
   const page = +(search.get('page') ?? 1)

   const [orderBy, setOrderBy] = useState<CourseOrderBy>(
      CourseOrderBy.CreatedAt
   )
   const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Desc)

   const { data, error, isLoading, isFetching, isPreviousData } =
      useGetCoursesQuery(
         {
            take: 3,
            skip: perPage * (page - 1),
            orderBy,
            sortOrder,
         },
         {
            keepPreviousData: true,
         }
      )

   const count = useMemo(
      () => data?.courses[0]?.count,
      [data?.courses[0].count]
   )

   return (
      <Container>
         <h1 className="text-2xl">
            Курсы
            <span className="text-slate-500 text-base pl-1">({count})</span>
         </h1>

         <div className="flex items-center space-x-2 mt-3">
            <Select
               value={orderBy}
               onChange={(value: CourseOrderBy) => setOrderBy(value)}
               data={optionsOrderBy}
               classNames={{
                  input: 'border-2 border-blue-500',
               }}
            />
            <Button
               variant="outline"
               size="sm"
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

               <Pagination length={count} page={page} isFetching={isFetching} />
            </>
         )}
      </Container>
   )
}

export default AllCourses
