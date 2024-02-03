export const TODO_FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
} as const

export const FILTERS_BUTTONS = {
  [TODO_FILTERS.ALL]: {
    literal: 'Todos',
    href: `/?filters=${TODO_FILTERS.ALL}`,
  },
  [TODO_FILTERS.ACTIVE]: {
    literal: 'Activos',
    href: `/?filters=${TODO_FILTERS.ACTIVE}`,
  },
  [TODO_FILTERS.COMPLETED]: {
    literal: 'Completados',
    href: `/?filters=${TODO_FILTERS.COMPLETED}`,
  },
} as const

export const ACTIONS_TODO = {
  REMOVE: 'REMOVE_TODO',
  COMPLETED: 'COMPLETED_TODO',
  REMOVE_COMPLETED: 'REMOVE_COMPLETED_TODO',
  ADD: 'ADD_TODO',
} as const
