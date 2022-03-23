import { useSignUpMutation } from '@api/generated'
import {
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   useDisclosure,
} from '@chakra-ui/react'
import { Formik, ErrorMessage } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import Button from './utils/Button'
import DisplayError from './utils/DisplayError'
import { FieldStyles, FormStyles, LabelStyles } from './utils/Form'

const SignupSchema = Yup.object().shape({
   name: Yup.string()
      .min(2, 'От двух символов')
      .max(50, 'Не больше 50 символов')
      .required('Обязательно'),
   lastName: Yup.string()
      .min(2, 'От двух символов')
      .max(50, 'Не больше 50 символов')
      .required('Обязательно'),
   email: Yup.string().email('Неверный email').required('Обязательно'),
   password: Yup.string()
      .min(2, 'От двух символов')
      .max(50, 'Не больше 50 символов')
      .required('Обязательно'),
})

const SignUp = () => {
   const [signUp, { isLoading, error, data }] = useSignUpMutation()

   const { isOpen, onOpen, onClose } = useDisclosure()
   const router = useRouter()

   return (
      <div className="max-w-md mx-auto my-6 bg-slate-200 p-4 lg:p-6 rounded-lg shadow-md">
         <h1 className="underline decoration-blue-500">Регистрация</h1>
         <Formik
            initialValues={{
               name: '',
               lastName: '',
               email: '',
               password: '',
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={SignupSchema}
            onSubmit={async (values, actions) => {
               signUp(values)
                  .unwrap()
                  .then(() => {
                     onOpen()
                     actions.resetForm()
                  })
                  .catch(err => {
                     toast.error('Ошибка')
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
                        Имя:
                        <FieldStyles name="name" />
                        <ErrorMessage
                           name="name"
                           render={msg => <DisplayError error={msg} />}
                        />
                     </LabelStyles>
                     <LabelStyles>
                        Фамилия:
                        <FieldStyles name="lastName" />
                        <ErrorMessage
                           name="lastName"
                           render={msg => <DisplayError error={msg} />}
                        />
                     </LabelStyles>
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
                     {error && <DisplayError error={error} />}
                     <Button type="submit" className="mt-3 w-full">
                        Зарегистрироваться
                     </Button>
                  </fieldset>
               </FormStyles>
            )}
         </Formik>

         <p className="text-center underline pt-3">
            <Link href="/login">
               <a>Войти</a>
            </Link>
         </p>

         <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Регистрация</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <p>
                     Для подтверждения аккаунта перейдите по ссылке,
                     отправленной на почту
                  </p>
               </ModalBody>
               <ModalFooter>
                  <Button
                     onClick={() => {
                        router.push('/login')
                        onClose()
                     }}
                  >
                     Ок
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </div>
   )
}

export default SignUp
