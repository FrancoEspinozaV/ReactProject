import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { Router } from './component/Router'
import { Error404 } from './pages/404'
import { getCurrentPath } from './utils.js'
import { Route } from './component/Route.jsx'
import { HomePage } from './pages/Home.jsx'
import { AboutPage } from './pages/About.jsx'

vi.mock('./utils.js', () => ({
  getCurrentPath: vi.fn(),
}))

describe('Router', () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should render without problems', () => {
    render(<Router routes={[]} />)
    expect(true).toBeTruthy()
  })

  it('should render 404 if no routes match', () => {
    render(<Router routes={[]} defaultComponent={Error404} />)
    expect(screen.getByText('404')).toBeTruthy()
  })

  it('should render the component of the firts route that matches', () => {
    getCurrentPath.mockReturnValue('/about')
    render(
      <Router routes={[]} defaultComponent={Error404}>
        <Route path='/' Component={HomePage} />
        <Route path='/about' Component={AboutPage} />
      </Router>
    )
    expect(screen.getByText('Acerca de mi')).toBeTruthy()
  })

  it('should navigate using Link', () => {
    getCurrentPath.mockReturnValueOnce('/')
    render(
      <Router routes={[]} defaultComponent={Error404}>
        <Route path='/' Component={HomePage} />
        <Route path='/about' Component={AboutPage} />
      </Router>
    )
    const button = screen.getByText('Ir a sobre nosotros')
    fireEvent.click(button)

    const aboutTitle = screen.getByText('Acerca de mi')
    expect(aboutTitle).toBeTruthy()
  })
})
