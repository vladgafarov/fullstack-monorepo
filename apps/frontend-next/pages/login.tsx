import Layout from '@components/Layout/Layout'
import Login from '@components/Login'
import Head from 'next/head'

const LogInPage = () => {
   return (
      <>
         <Head>
            <title>Вход</title>
         </Head>
         <Login />
      </>
   )
}
LogInPage.getLayout = function getLayout(page) {
   return <Layout>{page}</Layout>
}

export default LogInPage
