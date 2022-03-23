import Pagination from '@components/common/Pagination'
import { render, screen, fireEvent } from '@lib/test-utils'
import { useRouter } from 'next/router'

describe('Pagination component test', () => {
   it('Should render', () => {
      render(<Pagination length={12} link="test" />)
   })

   it('Should be 4 pages', () => {
      const { container } = render(<Pagination length={12} link="test" />)

      expect(container).toHaveTextContent(/всего страниц: 4/i)
   })

   it('Should navigate to next page', () => {
      const router = useRouter()
      render(<Pagination length={12} link="test" />)

      const button = screen.getByRole('button', { name: /2/i })
      fireEvent.click(button)

      expect(router.push).toHaveBeenCalled()
      expect(router.push).toHaveBeenCalledWith('test?page=2')
   })

   it('Should navigate to prev page', () => {
      const router = useRouter()
      render(<Pagination length={12} link="test" />)

      const buttonNext = screen.getByRole('button', { name: /2/i })
      const buttonPrev = screen.getByRole('button', { name: /1/i })

      fireEvent.click(buttonNext)
      expect(router.push).toHaveBeenCalledWith('test?page=2')

      fireEvent.click(buttonPrev)
      expect(router.push).toHaveBeenCalledWith('test?page=1')
   })

   it('Should prev button disabled', () => {
      render(<Pagination length={12} link="test" />)

      const button = screen.getByTestId(/prev/i)

      expect(button).toBeDisabled()
   })

   it('Should next button disabled', () => {
      const router = useRouter()
      const { rerender } = render(<Pagination length={6} link="test" />)

      const button = screen.getByTestId(/next/i)
      fireEvent.click(button)

      expect(router.push).toHaveBeenCalledWith('test?page=2')

      router.query.page = '2'

      rerender(<Pagination length={6} link="test" />)
      expect(router.query.page).toEqual('2')

      expect(button).toBeDisabled()
   })

   it('Should not render when < 2 pages', () => {
      const { container } = render(<Pagination length={1} link="test" />)

      expect(container).toMatchSnapshot()
   })
})

export {}
