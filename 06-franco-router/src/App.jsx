import { Router } from './component/Router'
import { Route } from './component/Route'
import { lazy } from 'react'
import { Suspense } from 'react'
import { Error404 } from './pages/404'

const AboutPage = lazy(() =>
  import('./pages/About').then((module) => ({ default: module.AboutPage }))
)

const HomePage = lazy(() =>
  import('./pages/Home').then((module) => ({ default: module.HomePage }))
)

const Search = lazy(() =>
  import('./pages/Search').then((module) => ({ default: module.Search }))
)

function App() {
  return (
    <Suspense fallback={null}>
      <Router routes={[]} defaultComponent={Error404}>
        <Route path='/' Component={HomePage} />
        <Route path='/:lang/about' Component={AboutPage} />
        <Route path='/about' Component={AboutPage} />
        <Route path='/:lang/search/:query' Component={Search} />
      </Router>
    </Suspense>
  )
}

export default App
