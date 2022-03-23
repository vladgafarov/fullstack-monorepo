import Layout from '@components/Layout/Layout'
import RequestResetPassword from '@components/RequestResetPassword'
import Head from 'next/head'

const ResetPasswordPage = () => {
   return (
      <>
         <Head>
            <title>Сброс пароля</title>
         </Head>
         <RequestResetPassword />
      </>
   )
}
ResetPasswordPage.getLayout = function getLayout(page) {
   return <Layout>{page}</Layout>
}

export default ResetPasswordPage
