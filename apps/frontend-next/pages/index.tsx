import AdminLayout from '@components/Layout/Admin/AdminLayout'
import Layout from '@components/Layout/Layout'
import Main from '@components/Main/Main'
import Head from 'next/head'

const Home = () => {
   return (
      <>
         <Head>
            <title>Courses</title>
         </Head>
         <Main />
      </>
   )
}
Home.getLayout = function getLayout(page) {
   return <Layout>{page}</Layout>
}

export default Home
