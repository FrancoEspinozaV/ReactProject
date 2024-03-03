import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Hola mundo</h1>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/tasks' element={<h1>Tasks</h1>} />
        <Route path='/add-task' element={<h1>add task</h1>} />
        <Route path='/task/:id' element={<h1>task id</h1>} />
        <Route path='/profile' element={<h1>profile</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
