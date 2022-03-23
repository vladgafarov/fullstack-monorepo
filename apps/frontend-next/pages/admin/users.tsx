import AdminUsers from '@components/Admin/Dashboard/Users/AdminUsers'
import AdminLayout from '@components/Layout/Admin/AdminLayout'
import Layout from '@components/Layout/Layout'
import Head from 'next/head'
import { ReactElement } from 'react'

const AdminUsersPage = () => {
   return (
      <>
         <Head>
            <title>Пользователи - админ</title>
         </Head>
         <AdminUsers />
      </>
   )
}
AdminUsersPage.getLayout = function getLayout(page: ReactElement) {
   return (
      <Layout>
         <AdminLayout>{page}</AdminLayout>
      </Layout>
   )
}

export default AdminUsersPage
