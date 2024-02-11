import { Todos } from './Components/Todos'
import { Footer } from './Components/Footer'
import { Header } from './Components/Header'
import { FilterContextProvider } from './contex/FilterContext'
import { useTodos } from './hooks/useTodos'

function App() {
  const { todos } = useTodos()
  return (
    <div className='todoapp'>
      <Header />

      {todos?.length !== 0 ? (
        <Todos />
      ) : (
        <strong>No tiene tareas agrega una :D </strong>
      )}

      <Footer />
    </div>
  )
}

export default App
