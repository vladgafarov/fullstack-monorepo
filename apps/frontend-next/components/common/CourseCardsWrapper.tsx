const CourseCardsWrapper = ({ children }) => {
   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
         {children}
      </div>
   )
}

export default CourseCardsWrapper
