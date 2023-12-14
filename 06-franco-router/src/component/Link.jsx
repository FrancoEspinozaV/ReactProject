import { STATE, BUTTON } from '../constantes'

export function navigate(href) {
  window.history.pushState({}, '', href)
  const navigationEvent = new Event(STATE.PUSH_STATE)
  window.dispatchEvent(navigationEvent)
}

export function Link({ target, to, ...pros }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === BUTTON.primary
    const isManageableEvent = target === undefined || target === 'self'
    const isModifiedEvent =
      event.metaKey || event.altKey || event.ctrlKey || event.shiftKey

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault()
      navigate(to)
    }
  }

  return <a onClick={handleClick} href={to} {...pros} />
}
