import { SquareType } from '../types'

interface PropsWithWeights {
  // dividir propsWithWeights
  elementos: SquareType[]
}

interface Props {
  elementos: SquareType[]
}
export function generarDatosAlAzarConPesos({ elementos }: PropsWithWeights) {
  const pesos = elementos.map((element) => element.weights)
  if (elementos.length !== pesos.length) {
    throw new Error('La longitud de elementos y pesos debe ser la misma')
  }

  const isCeros = pesos.every((elemento) => elemento === 0)

  if (isCeros) {
    throw new Error('No pueden existir pesos solo de 0')
  }

  const sumaPesos = pesos.reduce((acumulador, peso) => acumulador + peso, 0)

  const numeroAleatorio = Math.random() * sumaPesos

  let sumaParcial = 0
  for (let i = 0; i < elementos.length; i++) {
    sumaParcial += pesos[i]
    if (numeroAleatorio < sumaParcial) {
      return elementos[i]
    }
  }

  return elementos[0]
}

function generarDatosAlAzarSinPesos({ elementos }: Props) {
  // Verificar que haya elementos
  if (elementos.length === 0) {
    throw new Error('No se han proporcionado elementos')
  }

  // Generar un índice aleatorio
  const indiceAleatorio = Math.floor(Math.random() * elementos.length)

  // Devolver el elemento correspondiente al índice aleatorio
  return elementos[indiceAleatorio]
}

export function generarFakeMoves({ elementos }: Props) {
  const movimientosSimulados = []
  const totalMovimientos = 10 // Número total de movimientos simulados

  // Generar movimientos simulados
  for (let i = 0; i < totalMovimientos; i++) {
    const movimiento = generarDatosAlAzarSinPesos({ elementos })
    if (movimiento) {
      movimientosSimulados.push(movimiento)
    }
  }

  return movimientosSimulados
}
