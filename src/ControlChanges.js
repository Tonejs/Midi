import { controlChangeIds } from './ControlChange'

/**
 * Automatically creates an alias for named control values using Proxies
 * @returns {Object}
 */
export function ControlChanges(){
	return new Proxy({}, {
		get(target, handler){
			if (target[handler]){
				return target[handler]
			} else if (controlChangeIds.hasOwnProperty(handler)){
				return target[controlChangeIds[handler]]
			}
		},
		set(target, handler, value){
			if (controlChangeIds.hasOwnProperty(handler)){
				target[controlChangeIds[handler]] = value
			} else {
				target[handler] = value
			}
			return true
		}
	})
}
