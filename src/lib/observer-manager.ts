'use client'

type ObserverOptions = {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
}

type ObserverHandler = (entry: IntersectionObserverEntry) => void

interface ObserverRegistryEntry {
  observer: IntersectionObserver
  handlers: Map<Element, ObserverHandler>
}

const registries = new Map<string, ObserverRegistryEntry>()

const serializeOptions = ({
  root,
  rootMargin = '0px',
  threshold = 0,
}: ObserverOptions = {}) => {
  const rootId =
    root instanceof Element
      ? (root as Element).id || `[${(root as Element).tagName.toLowerCase()}]`
      : 'null'

  const thresholdKey = Array.isArray(threshold)
    ? threshold.join(',')
    : String(threshold)

  return `${rootId}|${rootMargin}|${thresholdKey}`
}

const getRegistryEntry = (options: ObserverOptions = {}) => {
  const key = serializeOptions(options)
  const existing = registries.get(key)
  if (existing) return existing

  const handlers = new Map<Element, ObserverHandler>()

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const handler = handlers.get(entry.target as Element)
      if (handler) {
        handler(entry)
      }
    })
  }, options)

  const registryEntry = { observer, handlers }

  registries.set(key, registryEntry)
  return registryEntry
}

export const observeElement = (
  element: Element,
  handler: ObserverHandler,
  options: ObserverOptions = {}
) => {
  const { observer, handlers } = getRegistryEntry(options)
  handlers.set(element, handler)
  observer.observe(element)
}

export const unobserveElement = (
  element: Element,
  options: ObserverOptions = {}
) => {
  const key = serializeOptions(options)
  const registryEntry = registries.get(key)
  if (!registryEntry) return

  registryEntry.handlers.delete(element)
  registryEntry.observer.unobserve(element)

  if (registryEntry.handlers.size === 0) {
    registryEntry.observer.disconnect()
    registries.delete(key)
  }
}
