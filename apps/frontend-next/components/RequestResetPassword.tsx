import { useRequestPasswordResetMutation } from '@api/generated'
import { Formik, ErrorMessage } from 'formik'
import Link from 'next/link'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import Button from './utils/Button'
import DisplayError from './utils/DisplayError'
import { FieldStyles, FormStyles, LabelStyles } from './utils/Form'

const ResetSchema = Yup.object().shape({
   email: Yup.string().email('Неверный email').required('Обязательно'),
})

const RequestResetPassword = () => {
   const [requestResetPassword, { isLoading, error }] =
      useRequestPasswordResetMutation()

   return (
      <div className="max-w-md mx-auto my-6 bg-slate-200 p-4 lg:p-6 rounded-lg shadow-md">
         <h1 className="underline decoration-blue-500">Сброс пароля</h1>
         <p>После запроса вы получите письмо для сброса пароля</p>
         <Formik
            initialValues={{
               email: '',
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={ResetSchema}
            onSubmit={(values, actions) => {
               requestResetPassword(values)
                  .unwrap()
                  .then(() => {
                     toast.success('Запрос успешно отправлен')
                     actions.resetForm()
                  })
            }}
         >
            {() => (
               <FormStyles className="mt-3">
                  <fieldset
                     disabled={isLoading}
                     style={isLoading ? { opacity: '0.5' } : {}}
                  >
                     <LabelStyles>
                        Почта:
                        <FieldStyles name="email" type="email" />
                        <ErrorMessage
                           name="email"
                           render={msg => <DisplayError error={msg} />}
                        />
                     </LabelStyles>

                     {error && <DisplayError error={error.message} />}
                     <Button type="submit" className="mt-3 w-full">
                        Сбрость пароль
                     </Button>
                  </fieldset>
               </FormStyles>
            )}
         </Formik>

         <p className="text-center underline pt-3">
            <Link href="/login">
               <a>Вход</a>
            </Link>
         </p>
      </div>
   )
}

export default RequestResetPassword
