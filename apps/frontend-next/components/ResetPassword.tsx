import { useResetPasswordMutation } from '@api/generated'
import { Formik, ErrorMessage } from 'formik'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import Button from './utils/Button'
import DisplayError from './utils/DisplayError'
import { FieldStyles, FormStyles, LabelStyles } from './utils/Form'

const ResetSchema = Yup.object().shape({
   password: Yup.string()
      .min(6, 'От 6 символов')
      .max(20, 'Не больше 20 символов')
      .required('Обязательно'),
   repeatPassword: Yup.string()
      .min(6, 'От 6 символов')
      .max(20, 'Не больше 20 символов')
      .required('Обязательно'),
})

const ResetPassword = () => {
   const router = useRouter()

   const token = router.query.token as string

   const [requestResetPassword, { isLoading, error }] =
      useResetPasswordMutation()

   return (
      <div className="max-w-md mx-auto my-6 bg-slate-200 p-4 lg:p-6 rounded-lg shadow-md">
         <h1 className="underline decoration-blue-500">Сброс пароля</h1>
         <Formik
            initialValues={{
               password: '',
               repeatPassword: '',
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={ResetSchema}
            onSubmit={({ password, repeatPassword }, actions) => {
               requestResetPassword({
                  password,
                  repeatPassword,
                  token,
               })
                  .unwrap()
                  .then(() => {
                     toast.success('Пароль успешно изменен')
                     router.push('/login')
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
                        Пароль:
                        <FieldStyles name="password" type="password" />
                        <ErrorMessage
                           name="password"
                           render={msg => <DisplayError error={msg} />}
                        />
                     </LabelStyles>
                     <LabelStyles>
                        Повтор пароля:
                        <FieldStyles name="repeatPassword" type="password" />
                        <ErrorMessage
                           name="repeatPassword"
                           render={msg => <DisplayError error={msg} />}
                        />
                     </LabelStyles>

                     {error && <DisplayError error={error.message} />}
                     <Button type="submit" className="mt-3 w-full">
                        Сменить пароль
                     </Button>
                  </fieldset>
               </FormStyles>
            )}
         </Formik>
      </div>
   )
}

export default ResetPassword
