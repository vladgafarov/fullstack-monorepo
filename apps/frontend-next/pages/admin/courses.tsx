import AdminCourses from '@components/Admin/Dashboard/Courses/AdminCourses'
import AdminLayout from '@components/Layout/Admin/AdminLayout'
import Layout from '@components/Layout/Layout'
import Head from 'next/head'
import { ReactElement } from 'react'

const AdminCoursesPage = () => {
   return (
      <>
         <Head>
            <title>Курсы - админ</title>
         </Head>
         <AdminCourses />
      </>
   )
}

AdminCoursesPage.getLayout = function getLayout(page: ReactElement) {
   return (
      <Layout>
         <AdminLayout>{page}</AdminLayout>
      </Layout>
   )
}

export default AdminCoursesPage
