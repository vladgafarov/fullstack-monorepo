import {
   useLazyGetCoursesQuery,
   useGetCoursesQuery,
   useRemoveCourseMutation,
} from '@api/enhanceApi'
import Star from '@components/Course/Star'
import DisplayError from '@components/utils/DisplayError'
import { format } from 'date-fns'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import Table from '../Table'

const AdminCourses = () => {
   const [id, setId] = useState()

   const [getCourses, { data, isLoading, error, isFetching }] =
      useLazyGetCoursesQuery()

   const { course } = useGetCoursesQuery(undefined, {
      selectFromResult: ({ data }) => ({
         course: data?.courses?.find(course => course.id === id),
      }),
   })

   const [removeCourse] = useRemoveCourseMutation()

   const columns = useMemo(
      () => [
         {
            accessor: 'id',
            Header: 'id',
            disableSortBy: true,
         },
         {
            accessor: 'title',
            Header: 'Название',
            Cell: ({
               value,
               row: {
                  values: { id },
               },
            }) => (
               <Link href={`/course/${id}`}>
                  <a className="underline">{value}</a>
               </Link>
            ),
         },
         {
            accessor: 'rating',
            Header: 'Рейтинг',
            Cell: ({ value }) => {
               if (!value) return '-'
               return (
                  <div className="flex items-center">
                     <Star
                        isActive={false}
                        className="fill-orange-400 text-sm"
                     />
                     {value.toString().length > 1 ? value.toFixed(2) : value}
                  </div>
               )
            },
         },
         {
            accessor: '_count.users',
            Header: 'Пользователей',
         },
         {
            accessor: '_count.reviews',
            Header: 'Отзывов',
         },
         {
            accessor: 'price',
            Header: 'Цена, ₽',
         },
      ],
      []
   )

   if (error) {
      return <DisplayError error={error} />
   }

   return (
      <div>
         <Table
            columns={columns}
            data={data?.courses ?? []}
            pageCount={Math.ceil(data?.courses[0].count / 10) ?? 0}
            fetchData={getCourses}
            loading={isLoading || isFetching}
            deleteFunc={removeCourse}
            id={id}
            setId={setId}
            info={course}
            length={data?.courses[0].count}
         />
      </div>
   )
}

export default AdminCourses
