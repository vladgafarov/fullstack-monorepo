export const DisplayError = ({ error }) => {
   return (
      <p className="text-red-500 font-proxima-medium">
         {error?.message ?? JSON.stringify(error)}
      </p>
   )
}
