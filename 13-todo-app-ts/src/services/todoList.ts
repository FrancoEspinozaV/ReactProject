import { ListOfTodo, TodoCompleted, TodoId, TodoTitle } from '../types'

const myRute = 'BIN ID'
const MasterKey = '$YOUR_MASTER_KEY'
const AccesKey = 'YOUR_ACCES_KEY'

export async function getTodos(): Promise<ListOfTodo> {
  const response = await fetch(`https://api.jsonbin.io/v3/b/${myRute}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-key': MasterKey,
      'X-Access-Key': AccesKey,
    },
  })

  if (!response.ok) throw new Error('Failed to fetch get TODOs.')
  const json = await response.json()

  return json?.record
}

export async function deleteTodos(id: TodoId) {
  const todos = await getTodos()
  const newTodos = todos.filter((todo) => todo.id !== id)
  if (todos.length > 0) {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${myRute}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-key': MasterKey,
        'X-Access-Key': AccesKey,
      },
      body: JSON.stringify(newTodos),
    })

    if (!response.ok) throw new Error('Failed to fetch add TODOs.')
    const json = await response.json()

    return json?.record
  }
  throw new Error('Debe quedar al menos un elemento')
}

export async function addTodos(title: TodoTitle) {
  const todos = await getTodos()
  const newTodo = {
    id: crypto.randomUUID(),
    title,
    completed: false,
  }
  const newTodos = [...todos, newTodo]
  const response = await fetch(`https://api.jsonbin.io/v3/b/${myRute}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-key': MasterKey,
      'X-Access-Key': AccesKey,
    },
    body: JSON.stringify(newTodos),
  })

  if (!response.ok) throw new Error('Failed to fetch add TODOs.')
  const json = await response.json()

  return json?.record
}
interface PropCompleted {
  id: TodoId
  completed: TodoCompleted
}
export async function completedTodos(idCompleted: PropCompleted) {
  const { id, completed } = idCompleted

  const todos = await getTodos()
  const newTodos = todos.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        completed,
      }
    }
    return todo
  })

  const response = await fetch(`https://api.jsonbin.io/v3/b/${myRute}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-key': MasterKey,
      'X-Access-Key': AccesKey,
    },
    body: JSON.stringify(newTodos),
  })

  if (!response.ok) throw new Error('Failed to fetch add TODOs.')
  const json = await response.json()

  return json?.record
}

export async function removeCompletedTodos() {
  const todos = await getTodos()
  const newTodos = todos.filter((todo) => !todo.completed)
  const response = await fetch(`https://api.jsonbin.io/v3/b/${myRute}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-key': MasterKey,
      'X-Access-Key': AccesKey,
    },
    body: JSON.stringify(newTodos),
  })

  if (!response.ok) throw new Error('Failed to fetch add TODOs.')
  const json = await response.json()

  return json?.record
}
