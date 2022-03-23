import {
   useLazyGetReviewsQuery,
   useDeleteReviewMutation,
   useGetReviewsQuery,
} from '@api/enhanceApi'
import DisplayError from '@components/utils/DisplayError'
import { useMemo, useState } from 'react'
import Table from '../Table'

const AdminReviews = () => {
   const [id, setId] = useState()

   const [getReviews, { data, isLoading, error, isFetching }] =
      useLazyGetReviewsQuery()

   const { review } = useGetReviewsQuery(undefined, {
      selectFromResult: ({ data }) => ({
         review: data?.reviews?.find(review => review.id === id),
      }),
   })

   const [removeReview] = useDeleteReviewMutation()

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
            info={review}
            length={data?.reviews[0].count}
         />
      </div>
   )
}

export default AdminReviews
