import { describe, test, expect, afterEach } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('<App />', () => {
  // no aporta valor pero es buen inicio
  test('should work', () => {
    const { getByText } = render(<App />)
    expect(getByText('Prueba Técnica')).toBeDefined()
  })
  afterEach(() => cleanup())
})

describe('End To End', () => {
  test('should add a new items and remove them', async () => {
    const user = userEvent.setup() // crear usuario
    const { getByRole, getByText } = render(<App />)

    // buscar input
    const inputAdd = getByRole('textbox')
    expect(inputAdd).toBeDefined()

    // Buscar Formulario
    const form = getByRole('form')
    expect(form).toBeDefined()

    // Boton para añadir
    const buttonAdd = form.querySelector('button')
    expect(buttonAdd).toBeDefined()

    // escribir en el input
    const textUser = crypto.randomUUID()

    await user.type(inputAdd, textUser)
    await user.click(buttonAdd!) // ya se comprobo que existe el boton

    // ver si se agrego a la lista
    const list = getByRole('list') // rol por defecto de las listas
    expect(list).toBeDefined()

    // numero de elementos que contiene la lista
    expect(list.childNodes.length).toBe(1)

    // Borrar elemento agregado
    const itemToDelete = getByText(textUser)
    const removeButton = itemToDelete.querySelector('button')
    expect(removeButton).toBeDefined()

    await user.click(removeButton!)

    const noResult = getByText('no existen elementos')
    expect(noResult).toBeDefined()
  })
  afterEach(() => cleanup())
})
