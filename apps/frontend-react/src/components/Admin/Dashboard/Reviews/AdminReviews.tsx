import { useDeleteReviewMutation, useGetReviewsQuery } from '@api/generated'
import { DisplayError } from 'ui'
import { useMemo, useState } from 'react'
import Table from '../Table'

const AdminReviews = () => {
   const [id, setId] = useState()

   const {
      refetch: getReviews,
      data,
      isLoading,
      error,
      isFetching,
   } = useGetReviewsQuery(null, {
      enabled: false,
   })

   // const { review } = useGetReviewsQuery(undefined, {
   //    selectFromResult: ({ data }) => ({
   //       review: data?.reviews?.find(review => review.id === id),
   //    }),
   // })

   const { mutate: removeReview } = useDeleteReviewMutation()

   const columns = useMemo(
      () => [
         {
            accessor: 'rating',
            Header: 'Оценка',
         },
         {
            accessor: 'text',
            Header: 'Текст',
         },
         {
            accessor: 'course.title',
            Header: 'Курс',
         },
         {
            accessor: 'user.name',
            Header: 'Пользователь',
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
            data={data?.reviews ?? []}
            pageCount={Math.ceil(data?.reviews[0].count / 10) ?? 0}
            fetchData={getReviews}
            loading={isLoading || isFetching}
            deleteFunc={removeReview}
            id={id}
            setId={setId}
            info={{ review: 'hi' }}
            // info={review}
            length={data?.reviews[0].count}
            setTableData={() => {}}
         />
      </div>
   )
}

export default AdminReviews
