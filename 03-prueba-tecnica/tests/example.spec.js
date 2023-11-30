// @ts-check
import { test, expect } from '@playwright/test'
const LOCALHOST = 'http://localhost:5173/'
const HOST_IMAGE = 'https://cataas.com/'

test('app show random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST)

  const text = await page.getByRole('paragraph')
  const image = await page.getByRole('img')

  const textContent = await text.textContent()
  const imageSrc = await image.getAttribute('src')

  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(imageSrc?.startsWith(HOST_IMAGE)).toBeTruthy()
})

test('Refresh fact and image when click button', async ({ page }) => {
  await page.goto(LOCALHOST)

  // Obtener elementos antes de hacer clic
  const textBefore = await page.getByRole('paragraph')
  const imageBefore = await page.getByRole('img')

  // Obtener atributos antes de hacer clic
  const textContentBefore = await textBefore.textContent()
  const imageSrcBefore = await imageBefore.getAttribute('src')

  // Hacer clic en el botón
  await page.click('text=get Random fact')

  await page.waitForTimeout(2000)

  // Obtener elementos después de hacer clic
  const textAfter = await page.getByRole('paragraph')
  const imageAfter = await page.getByRole('img')

  // Obtener atributos después de hacer clic
  const textContentAfter = await textAfter.textContent()
  const imageSrcAfter = await imageAfter.getAttribute('src')

  // Realizar aserciones
  await expect(textContentBefore).not.toBe(textContentAfter)
  await expect(imageSrcAfter).not.toBe(imageSrcBefore)
})
