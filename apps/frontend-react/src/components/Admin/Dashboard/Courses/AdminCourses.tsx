import {
   CourseOrderBy,
   SortOrder,
   useGetCoursesQuery,
   useRemoveCourseMutation,
} from '@api/generated'
import { Star, DisplayError } from 'ui'
import { useMemo, useState } from 'react'
import Table from '../Table'
import { Link } from 'react-router-dom'

const AdminCourses = () => {
   const [id, setId] = useState()
   const [tableData, setTableData] = useState<{
      pageSize: number
      pageIndex: number
      orderBy: CourseOrderBy
      sortBy: { desc: boolean }
   }>(undefined)
   // const { orderBy, pageIndex, pageSize, sortBy } = tableData

   const {
      refetch: getCourses,
      data,
      isLoading,
      error,
      isFetching,
   } = useGetCoursesQuery(
      {
         skip: tableData?.pageSize * tableData?.pageIndex,
         take: tableData?.pageSize,
         orderBy: tableData?.orderBy,
         sortOrder: (tableData?.sortBy[0]?.desc ? 'desc' : 'asc') as SortOrder,
      },
      {
         enabled: !!tableData,
      }
   )

   // const { course } = useGetCoursesQuery(undefined, {
   //    selectFromResult: ({ data }) => ({
   //       course: data?.courses?.find(course => course.id === id),
   //    }),
   // })

   const { mutate: removeCourse } = useRemoveCourseMutation()

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
               <Link to={`/course/${id}`} className="underline">
                  {value}
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
            info={{ course: 'hi' }}
            // info={course}
            length={data?.courses[0].count}
            setTableData={setTableData}
         />
      </div>
   )
}

export default AdminCourses
