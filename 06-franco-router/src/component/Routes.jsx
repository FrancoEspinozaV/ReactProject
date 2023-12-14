import { Children, useEffect, useState } from 'react'
import { STATE } from '../constantes'
import { match } from 'path-to-regexp'

export function Routes({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => null,
}) {
  const [curretPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
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

  const routeToUse = routes.concat(routesFromChildren)

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
