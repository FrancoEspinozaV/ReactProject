import { Children, useEffect, useState } from 'react'
import { STATE } from '../constantes'
import { match } from 'path-to-regexp'
import { getCurrentPath } from '../utils'
export function Router({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => null,
}) {
  const [curretPath, setCurrentPath] = useState(getCurrentPath())

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath())
    }

    window.addEventListener(STATE.PUSH_STATE, onLocationChange)
    window.addEventListener(STATE.POP_STATE, onLocationChange)

    return () => {
      window.removeEventListener(STATE.PUSH_STATE, onLocationChange)
      window.removeEventListener(STATE.POP_STATE, onLocationChange)
    }
  }, [])

  let routParams = {}

  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'

    return isRoute ? props : null
  })

  const routeToUse = routes.concat(routesFromChildren).filter(Boolean)

  const Page = routeToUse.find(({ path }) => {
    if (path === curretPath) return true

    const matcherhURL = match(path, { decode: decodeURIComponent })
    const matched = matcherhURL(curretPath)

    if (!matched) return false

    routParams = matched.params
    return true
  })?.Component

  return Page ? (
    <Page routParams={routParams} />
  ) : (
    <DefaultComponent routParams={routParams} />
  )
}
