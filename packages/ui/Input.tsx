import {
   TextInput,
   TextInputProps,
   PasswordInput as PassInput,
   PasswordInputProps,
} from '@mantine/core'

export const Input = (props?: TextInputProps) => {
   return (
      <TextInput
         classNames={{
            input: `
               border-2 border-blue-500 rounded-md
               px-4 py-2
               focus:ring-2 focus:ring-blue-300
            `,
            invalid: `border-red-400`,
         }}
         size="md"
         {...props}
      />
   )
}

export const PasswordInput = (props: PasswordInputProps) => {
   return (
      <PassInput
         classNames={{
            root: 'group',
            input: `
               border-2 border-blue-500 rounded-md
               px-4 py-2
               focus:ring-2 ring-blue-300
            `,
            invalid: `border-red-400`,
         }}
         size="md"
         {...props}
      />
   )
}
