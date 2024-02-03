import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'todomvc-app-css/index.css'
import { TodoProvider } from './contex/TodoContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TodoProvider>
    <App />
  </TodoProvider>
)
