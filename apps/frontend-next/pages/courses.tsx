import Courses from '@components/Courses/Courses'
import Layout from '@components/Layout/Layout'
import type { NextPage } from 'next'
import Head from 'next/head'

const CoursesPage = () => {
   return (
      <>
         <Head>
            <title>Все курсы</title>
         </Head>
         <Courses />
      </>
   )
}
CoursesPage.getLayout = function getLayout(page) {
   return <Layout>{page}</Layout>
}

export default CoursesPage
