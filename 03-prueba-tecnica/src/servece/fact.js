import { ENDPOINT_CAT_FACT } from '../constantes'

export async function getRandomFact() {
  const res = await fetch(ENDPOINT_CAT_FACT)
  const json = await res.json()
  const { fact } = json
  return fact
}
