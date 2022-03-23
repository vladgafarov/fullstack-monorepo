import { useRemoveUserMutation, useGetUsersQuery } from '@api/generated'
import { DisplayError } from 'ui'
import { useMemo, useState } from 'react'
import Table from '../Table'

const AdminUsers = () => {
   const [id, setId] = useState()

   const {
      refetch: getUsers,
      data,
      isLoading,
      error,
      isFetching,
   } = useGetUsersQuery(null, {
      enabled: false,
   })

   // const { user } = useGetUsersQuery(undefined, {
   //    selectFromResult: ({ data }) => ({
   //       user: data?.users?.find(user => user.id === id),
   //    }),
   // })

   const { mutate: removeUser } = useRemoveUserMutation()

   const columns = useMemo(
      () => [
         {
            accessor: 'name',
            Header: 'Имя',
         },
         {
            accessor: 'lastName',
            Header: 'Фамилия',
         },
         {
            accessor: '_count.courses',
            Header: 'Курсы',
         },
         {
            accessor: '_count.reviews',
            Header: 'Отзывы',
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
            data={data?.users ?? []}
            pageCount={Math.ceil(data?.users[0].count / 10) ?? 0}
            fetchData={getUsers}
            loading={isLoading || isFetching}
            deleteFunc={removeUser}
            id={id}
            setId={setId}
            info={{ user: 'hi' }}
            // info={user}
            length={data?.users[0].count}
            setTableData={() => {}}
         />
      </div>
   )
}

export default AdminUsers
