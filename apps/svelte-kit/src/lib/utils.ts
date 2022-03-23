import type * as yup from 'yup'

export function extractErrors(err) {
   return err.inner.reduce((acc, err) => {
      return { ...acc, [err.path]: err.message }
   }, {})
}

export const validateForm = async <V>(
   schema: yup.AnyObjectSchema,
   values: V
): Promise<undefined | Record<string, unknown>> => {
   let errors = {}

   try {
      await schema.validate(values, { abortEarly: false })
   } catch (err) {
      errors = extractErrors(err)
   }

   return Object.keys(errors).length > 0 ? errors : undefined
}
