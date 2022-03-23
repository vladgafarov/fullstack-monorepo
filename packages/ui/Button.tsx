import { Button as BaseButton, ButtonProps } from '@mantine/core'

export const Button = ({ children, ...props }: ButtonProps<'button'>) => {
   return (
      <BaseButton
         classNames={{
            root: 'font-bold py-2 px-4 rounded border-2 bg-blue-500 border-blue-500 hover:bg-blue-700 hover:border-blue-700 text-white',
            outline: 'bg-white border-blue-500 hover:bg-blue-200 text-blue-500',
         }}
         size="md"
         {...props}
      >
         {children}
      </BaseButton>
   )
}

export const ButtonAlert = ({ children, ...props }: ButtonProps<'button'>) => {
   return (
      <BaseButton
         classNames={{
            root: 'font-bold py-2 px-4 rounded border-2 bg-red-500 border-red-500 hover:bg-red-700 hover:border-red-700 text-white',
            outline: 'bg-white border-red-500 hover:bg-red-200 text-red-500',
         }}
         size="md"
         {...props}
      >
         {children}
      </BaseButton>
   )
}
