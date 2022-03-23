import Course from '@components/Course/Course'
import Layout from '@components/Layout/Layout'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'

const CoursePage = ({ id }) => {
   return (
      <>
         <Head>
            <title>Курс</title>
         </Head>
         <Course id={id} />
      </>
   )
}

export const getServerSideProps: GetServerSideProps = async context => {
   const { id } = context.params

   return {
      props: { id },
   }
}

CoursePage.getLayout = function getLayout(page) {
   return <Layout>{page}</Layout>
}

export default CoursePage
