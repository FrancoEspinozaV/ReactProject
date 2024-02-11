import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'todomvc-app-css/index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FilterContextProvider } from './contex/FilterContext.tsx'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <FilterContextProvider>
      <App />
    </FilterContextProvider>
  </QueryClientProvider>
)
