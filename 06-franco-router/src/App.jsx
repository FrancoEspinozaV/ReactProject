import { Routes } from './component/Routes'
import { Route } from './component/Route'
import { lazy } from 'react'
import { Suspense } from 'react'

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
      <Routes>
        <Route path='/' Component={HomePage} />
        <Route path='/:lang/about' Component={AboutPage} />
        <Route path='/about' Component={AboutPage} />
        <Route path='/:lang/search/:query' Component={Search} />
      </Routes>
    </Suspense>
  )
}

export default App
