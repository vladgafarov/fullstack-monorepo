import Layout from '@components/Layout/Layout'
import ResetPassword from '@components/ResetPassword'
import Head from 'next/head'

const TokenPage = () => {
   return (
      <>
         <Head>
            <title>Сброс пароля - новый пароль</title>
         </Head>
         <ResetPassword />
      </>
   )
}
TokenPage.getLayout = function getLayout(page) {
   return <Layout>{page}</Layout>
}

export default TokenPage
