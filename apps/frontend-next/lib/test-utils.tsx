import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@redux/store'

const AllTheProviders = ({ children }) => {
   return <Provider store={store}>{children}</Provider>
}

const customRender = (
   ui: ReactElement,
   options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
