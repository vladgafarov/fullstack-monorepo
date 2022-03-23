import { useConfirmUserMutation } from '@api/generated'
import { useEffect } from 'react'
import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import { Container, DisplayError } from 'ui'

const ConfirmUser = () => {
   const [search] = useSearchParams()
   const token = search.get('token')

   const { mutate, isLoading, error, data } = useConfirmUserMutation()

   useEffect(() => {
      if (token) {
         mutate({ token })
      }
      //eslint-disable-next-line
   }, [token])

   if (!token) {
      return <Navigate to="/" />
   }

   return (
      <Container>
         <h1>Подтверждение регистрации</h1>
         {isLoading && <p>Подождите...</p>}
         {error && <DisplayError error={error} />}

         {data && (
            <p>Учетная запись {data.confirmUser.email} успешно активирована</p>
         )}
      </Container>
   )
}

export default ConfirmUser
