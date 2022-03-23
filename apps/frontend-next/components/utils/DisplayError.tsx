const DisplayError = ({ error }) => {
   return (
      <p className="text-red-500 font-proxima-medium">
         {error?.message ?? error}
      </p>
   )
}

export default DisplayError
