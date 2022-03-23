import Layout from '@components/Layout/Layout'
import UserCourses from '@components/Profile/UserCourses'
import Head from 'next/head'

const CoursesPage = () => {
   return (
      <>
         <Head>
            <title>Курсы пользователя</title>
         </Head>
         <UserCourses />
      </>
   )
}
CoursesPage.getLayout = function getLayout(page) {
   return <Layout>{page}</Layout>
}

export default CoursesPage
