import { HomePage } from './pages/Home'
import { AboutPage } from './pages/About'
import { Routes } from './component/Routes'
import { Search } from './pages/Search'
import { Route } from './component/Route'

function App() {
  return (
    <main>
      <Routes>
        <Route path='/' Component={HomePage} />
        <Route path='/about' Component={AboutPage} />
        <Route path='/search/:query' Component={Search} />
      </Routes>
    </main>
  )
}

export default App
