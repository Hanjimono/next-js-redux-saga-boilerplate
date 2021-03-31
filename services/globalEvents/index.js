import { useRef, useEffect } from "react"

class GlobalEvents {
	constructor() {
		this.subscribers = {}
	}
	dispatchEvent(eventName, ...args) {
		let subscribers = this.subscribers[eventName]
		if (subscribers instanceof Array) {
			for (let subscriber of subscribers) {
				subscriber[0].apply(subscriber[1], args)
			}
		}
	}
	listen(eventName, callback, subscriber) {
		this.subscribers[eventName] = this.subscribers[eventName] || []
		this.subscribers[eventName].push([callback, subscriber])
	}
	unsubscribe(eventName, callback) {
		let subscribers = this.subscribers[eventName]
		this.subscribers[eventName] = subscribers.filter(([cb]) => cb !== callback)
	}
}

export function useEventListener(
	eventName,
	handler,
	element = null,
	props = null
) {
	// Create a ref that stores handler
	const savedHandler = useRef()

  if (!element && typeof window !== "undefined") {
    element = window
  }
	// Update ref.current value if handler changes.
	// This allows our effect below to always get latest handler ...
	// ... without us needing to pass it in effect deps array ...
	// ... and potentially cause effect to re-run every render.
	useEffect(() => {
		savedHandler.current = handler
	}, [handler])

	useEffect(
		() => {
			// Make sure element supports addEventListener
			// On
			const isSupported = element && element.addEventListener
			if (!isSupported) return

			// Create event listener that calls handler function stored in ref
			const eventListener = (e) => savedHandler.current(e.props)

			// Add event listener
			element.addEventListener(eventName, eventListener)

			// Remove event listener on cleanup
			return () => {
				element.removeEventListener(eventName, eventListener)
			}
		},
		[eventName, element] // Re-run if eventName or element changes
	)
}

export function popup(type, options = {}, isOpen = true) {
	if (typeof Event !== "undefined"){
		var event = new Event("popupEvent")
		event.props = {
			type,
			isOpen,
			options,
		}
		window.dispatchEvent(event)
	}
}

export function dispatchCustomEvent(eventName, element = window) {
	var event = new Event(eventName)
	element.dispatchEvent(event)
}

export default new GlobalEvents()
