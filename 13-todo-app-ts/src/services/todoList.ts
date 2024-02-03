import { ListOfTodo } from '../types'
// JSON BIN
const myRute = 'BIN ID'
const MasterKey = 'YOUR MASTER KEY'
const AccesKey = 'YOUR ACCES KEY'

export async function getTodos() {
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

export async function deleteTodos({ todos }: { todos: ListOfTodo }) {
  if (todos.length > 0) {
    updateTodos({ todos })
  }
  throw new Error('Debe quedar al menos un elemento')
}

export async function addTodos({ todos }: { todos: ListOfTodo }) {
  updateTodos({ todos })
}

export async function completedTodos({ todos }: { todos: ListOfTodo }) {
  updateTodos({ todos })
}

export async function updateTodos({ todos }: { todos: ListOfTodo }) {
  const response = await fetch(`https://api.jsonbin.io/v3/b/${myRute}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-key': MasterKey,
      'X-Access-Key': AccesKey,
    },
    body: JSON.stringify(todos),
  })

  if (!response.ok) throw new Error('Failed to fetch add TODOs.')
  const json = await response.json()

  return json?.record
}
