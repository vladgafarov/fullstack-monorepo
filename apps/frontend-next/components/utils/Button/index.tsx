import classNames from 'classnames/bind'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

type ButtonType = 'default' | 'light' | 'green' | 'red' | 'redLight'

interface IButton {
   children: React.ReactChild
   onClick?: () => void
   theme?: ButtonType
   className?: string
}

const styles: Record<ButtonType | 'base', string> = {
   base: 'font-bold py-2 px-4 rounded border-2',
   default:
      'bg-blue-500 border-blue-500 hover:bg-blue-700 hover:border-blue-700 text-white',
   green: 'bg-green-500 border-green-500 hover:bg-green-700 hover:border-green-700 text-white',
   red: 'bg-red-500 border-red-500 hover:bg-red-700 hover:border-red-700 text-white',
   light: 'bg-white border-blue-500 hover:bg-blue-200 text-blue-500',
   redLight: 'bg-white border-red-500 hover:bg-red-200 text-red-500',
}

let cx = classNames.bind(styles)

const Button = ({
   children,
   className,
   theme = 'default',
   ...props
}: IButton &
   DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
   >) => {
   const buttonClass = cx(
      {
         base: true,
         default: theme === 'default',
         green: theme === 'green',
         light: theme === 'light',
         red: theme === 'red',
         redLight: theme === 'redLight',
      },
      className
   )

   return (
      <button className={buttonClass} {...props}>
         {children}
      </button>
   )
}

export default Button
