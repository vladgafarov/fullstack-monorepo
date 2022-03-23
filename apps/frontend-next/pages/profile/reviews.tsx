import Layout from '@components/Layout/Layout'
import UserReviews from '@components/Profile/UserReviews'
import Head from 'next/head'

const ReviewsPage = () => {
   return (
      <>
         <Head>
            <title>Отзывы пользователя</title>
         </Head>
         <UserReviews />
      </>
   )
}
ReviewsPage.getLayout = function getLayout(page) {
   return <Layout>{page}</Layout>
}

export default ReviewsPage
