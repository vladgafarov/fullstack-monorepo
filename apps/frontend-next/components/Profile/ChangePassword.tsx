import { useChangePasswordMutation } from '@api/generated'
import Button from '@components/utils/Button'
import DisplayError from '@components/utils/DisplayError'
import {
   FormNativeStyles,
   InputStyles,
   LabelStyles,
} from '@components/utils/Form'
import { useState } from 'react'
import toast from 'react-hot-toast'

const ChangePassword = ({ onClose }) => {
   const [password, setPassword] = useState<string>()
   const [repeatPassword, setRepeatPassword] = useState<string>()

   const [changePasswordMutation, { isLoading, error }] =
      useChangePasswordMutation()

   const changePassword = e => {
      e.preventDefault()

      changePasswordMutation({ password })
         .unwrap()
         .then(() => {
            toast.success('Пароль успешно сменен')
            onClose()
         })
         .catch(err => {})
   }

   return (
      <div>
         <FormNativeStyles onSubmit={changePassword}>
            <fieldset disabled={isLoading}>
               <LabelStyles>
                  Новый пароль:
                  <InputStyles
                     type="password"
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                  />
               </LabelStyles>
               <LabelStyles>
                  Повтор пароля:
                  <InputStyles
                     type="password"
                     value={repeatPassword}
                     onChange={e => setRepeatPassword(e.target.value)}
                  />
               </LabelStyles>

               {error && <DisplayError error={error} />}

               <Button
                  disabled={
                     password !== repeatPassword || !password || !repeatPassword
                  }
                  className="mt-3"
               >
                  Сменить пароль
               </Button>
            </fieldset>
         </FormNativeStyles>
      </div>
   )
}

export default ChangePassword
