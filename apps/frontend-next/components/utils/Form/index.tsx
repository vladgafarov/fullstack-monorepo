import { Field, Form } from 'formik'
import tw from 'tailwind-styled-components'

export const FormStyles = tw(Form)`
   flex
   flex-col
`

export const FormNativeStyles = tw.form`
   flex
   flex-col
`

export const LabelStyles = tw.label`
   flex 
   flex-col
   font-proxima-medium
   mb-3
`

export const FieldStyles = tw(Field)`
   border-2 border-blue-500 rounded-md 
   px-4 py-2
   focus:ring-2 focus:ring-blue-300 focus:outline-none
`

export const InputStyles = tw.input`
   border-2 border-blue-500 rounded-md 
   px-4 py-2
   focus:ring-2 focus:ring-blue-300 focus:outline-none
   file:mr-4 file:py-2 file:px-4
   file:rounded-md file:border-0
   file:text-sm file:font-semibold
   file:bg-blue-200 file:text-blue-700
   hover:file:bg-blue-100
`
