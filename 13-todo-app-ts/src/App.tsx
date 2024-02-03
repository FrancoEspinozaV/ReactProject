import { Todos } from './Components/Todos'
import { Footer } from './Components/Footer'
import { Header } from './Components/Header'
import { useTodoContext } from './contex/TodoContext'
import { FilterContextProvider } from './contex/FilterContext'

function App() {
  const { todos } = useTodoContext()

  return (
    <FilterContextProvider>
      <div className='todoapp'>
        <Header />

        {todos.length !== 0 ? (
          <Todos />
        ) : (
          <strong>No tiene tareas agrega una :D </strong>
        )}

        <Footer />
      </div>
    </FilterContextProvider>
  )
}

export default App
