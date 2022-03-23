import { useConfirmUserMutation } from '@api/generated'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Container from './utils/Container'
import DisplayError from './utils/DisplayError'

const ConfirmUser = () => {
   const router = useRouter()
   const token = router.query.token as string

   const [confirmUser, { data, isLoading, error }] = useConfirmUserMutation()

   useEffect(() => {
      if (token) {
         confirmUser({ token })
      }
      //eslint-disable-next-line
   }, [token])

   return (
      <Container>
         <h1>Подтверждение регистрации</h1>
         {isLoading && <p>Подождите...</p>}
         {error && <DisplayError error={error.message} />}

         {data && (
            <p>Учетная запись {data.confirmUser.email} успешно активирована</p>
         )}
      </Container>
   )
}

export default ConfirmUser
