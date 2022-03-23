import AdminReviews from '@components/Admin/Dashboard/Reviews/AdminReviews'
import AdminLayout from '@components/Layout/Admin/AdminLayout'
import Layout from '@components/Layout/Layout'
import Head from 'next/head'
import { ReactElement } from 'react'

const AdminReviewsPage = () => {
   return (
      <>
         <Head>
            <title>Отзывы - админ</title>
         </Head>
         <AdminReviews />
      </>
   )
}
AdminReviewsPage.getLayout = function getLayout(page: ReactElement) {
   return (
      <Layout>
         <AdminLayout>{page}</AdminLayout>
      </Layout>
   )
}

export default AdminReviewsPage
