import { describe, expect, test } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from '../App.tsx'
import { FilterContextProvider } from '../contex/FilterContext.tsx'

describe('End To end', () => {
  test('End To End', async () => {
    const queryClient = new QueryClient()
    render(
      // crear un custom render
      // https://testing-library.com/docs/react-testing-library/setup/
      <QueryClientProvider client={queryClient}>
        <FilterContextProvider>
          <App />
        </FilterContextProvider>
      </QueryClientProvider>
    )

    screen.debug()

    expect(true).toBeTruthy()
  })
})
