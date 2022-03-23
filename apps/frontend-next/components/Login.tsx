import { Formik, ErrorMessage } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import Button from './utils/Button'
import DisplayError from './utils/DisplayError'
import { FieldStyles, FormStyles, LabelStyles } from './utils/Form'
import { useLogInMutation } from '@api/enhanceApi'

const LoginSchema = Yup.object().shape({
   email: Yup.string().email('Неверный email').required('Обязательно'),
   password: Yup.string()
      .min(2, 'От двух символов')
      .max(50, 'Не больше 50 символов')
      .required('Обязательно'),
})

const Login = () => {
   const [logIn, { isLoading, data, error }] = useLogInMutation()

   const router = useRouter()

   return (
      <div className="max-w-md mx-auto my-6 bg-slate-200 p-4 lg:p-6 rounded-lg shadow-md">
         <h1 className="underline decoration-blue-500">Вход</h1>
         <Formik
            initialValues={{
               email: 'rico@test.com',
               password: '123456',
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={LoginSchema}
            onSubmit={(values, actions) => {
               logIn(values)
                  .unwrap()
                  .then(res => {
                     toast.success('Вход выполнен успешно')
                     actions.resetForm()
                     router.push('/')
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
                     <LabelStyles>
                        Пароль:
                        <FieldStyles name="password" type="password" />
                        <ErrorMessage
                           name="password"
                           render={msg => <DisplayError error={msg} />}
                        />
                     </LabelStyles>
                     {error && <DisplayError error={error.message} />}
                     <Button type="submit" className="mt-3 w-full">
                        Войти
                     </Button>
                  </fieldset>
               </FormStyles>
            )}
         </Formik>

         <p className="text-center underline pt-3">
            <Link href="/signup">
               <a>Регистрация</a>
            </Link>
         </p>
         <p className="text-center underline pt-3">
            <Link href="/reset-password">
               <a>Сброс пароля</a>
            </Link>
         </p>
      </div>
   )
}

export default Login
