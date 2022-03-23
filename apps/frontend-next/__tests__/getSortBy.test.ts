import { getSortBy } from '@lib/getSortBy'

describe('getSortBy tests', () => {
   it('works with accessor', () => {
      const value = '_count.users'
      const outputValue = 'users'

      const orderBy = getSortBy(value)

      expect(orderBy).toEqual(outputValue)
   })

   it('works with no accessor', () => {
      const value = 'title'
      const outputValue = 'title'

      const orderBy = getSortBy(value)

      expect(orderBy).toEqual(outputValue)
   })
})

export {}
