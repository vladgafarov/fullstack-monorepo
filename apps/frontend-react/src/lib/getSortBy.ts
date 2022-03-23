const UNSIGNED_FIELDS = [
   {
      accessor: '_count.users',
      value: 'users',
   },
   {
      accessor: '_count.reviews',
      value: 'reviews',
   },
   {
      accessor: '_count.courses',
      value: 'courses',
   },
   {
      accessor: 'course.title',
      value: 'course',
   },
   {
      accessor: 'user.name',
      value: 'user',
   },
]

const UNSIGNED_FIELDS_FLAT = UNSIGNED_FIELDS.map(item => item.accessor)

export const getSortBy = (id: string): string => {
   if (UNSIGNED_FIELDS_FLAT.includes(id)) {
      return UNSIGNED_FIELDS.find(item => item.accessor === id).value
   }

   return id
}
