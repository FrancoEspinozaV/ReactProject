import {
  addTodos,
  completedTodos,
  deleteTodos,
  getTodos,
  removeCompletedTodos,
} from '../services/todoList'
import { ListOfTodo, TodoCompleted, TodoId, TodoTitle } from '../types'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'

export function useTodos() {
  const { data } = useSuspenseQuery<ListOfTodo>({
    queryKey: ['todo'],
    queryFn: getTodos,
  })

  const queryClient = useQueryClient()

  const mutateAdd = useMutation({
    mutationFn: addTodos,
    onMutate: async (newTitle) => {
      await queryClient.cancelQueries({ queryKey: ['todo'] })
      const previousTodo = queryClient.getQueryData(['todo']) as ListOfTodo
      queryClient.setQueryData(['todo'], (old: ListOfTodo) => {
        const newTodo = {
          id: crypto.randomUUID(),
          title: newTitle,
          completed: false,
        }
        return [...old, newTodo]
      })
      return { previousTodo }
    },

    onError: (err, newTodo, context) => {
      console.log(err, newTodo)
      queryClient.setQueryData(['todo'], context?.previousTodo)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todo'] })
    },
  })

  const mutateDelete = useMutation({
    mutationFn: deleteTodos,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['todo'] })
      const previousTodo = queryClient.getQueryData(['todo']) as ListOfTodo

      queryClient.setQueryData(['todo'], (old: ListOfTodo) => {
        const newTodos = old.filter((todo) => todo.id !== id)
        return newTodos
      })

      return { previousTodo }
    },

    onError: (err, newTodo, context) => {
      console.log(err, newTodo)
      queryClient.setQueryData(['todo'], context?.previousTodo)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todo'] })
    },
  })

  const mutateComplete = useMutation({
    mutationFn: completedTodos,
    onMutate: async (variable) => {
      await queryClient.cancelQueries({ queryKey: ['todo'] })
      const previousTodo = queryClient.getQueryData(['todo']) as ListOfTodo

      queryClient.setQueryData(['todo'], (old: ListOfTodo) => {
        const newTodos = old.map((todo) => {
          if (todo.id === variable.id) {
            return {
              ...todo,
              completed: variable.completed,
            }
          }
          return todo
        })
        return newTodos
      })

      return { previousTodo }
    },

    onError: (err, newTodo, context) => {
      console.log(err, newTodo)
      queryClient.setQueryData(['todo'], context?.previousTodo)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todo'] })
    },
  })

  const mutateRemoveComplete = useMutation({
    mutationFn: removeCompletedTodos,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['todo'] })
      const previousTodo = queryClient.getQueryData(['todo']) as ListOfTodo

      queryClient.setQueryData(['todo'], (old: ListOfTodo) => {
        const newTodos = old.filter((todo) => !todo.completed)
        return newTodos
      })

      return { previousTodo }
    },

    onError: (err, newTodo, context) => {
      console.log(err, newTodo)
      queryClient.setQueryData(['todo'], context?.previousTodo)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todo'] })
    },
  })

  const addTodoContext = (title: TodoTitle) => {
    mutateAdd.mutate(title)
  }
  const deleteTodoContext = (id: TodoId) => {
    mutateDelete.mutate(id)
  }
  const deleteCompletedTodoContext = () => {
    mutateRemoveComplete.mutate()
  }
  const completedTodoContext = ({
    id,
    completed,
  }: {
    id: TodoId
    completed: TodoCompleted
  }) => {
    mutateComplete.mutate({ id, completed })
  }

  return {
    todos: data,
    addTodo: addTodoContext,
    removeTodo: deleteTodoContext,
    completedTodo: completedTodoContext,
    removeCompleted: deleteCompletedTodoContext,
  }
}
