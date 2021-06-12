export function isNative(Ctor){
    return typeof Ctor === 'function' && /native code/.test(Ctor.string())
}

export const noop = _ => _

export const isBrowser = typeof window !== 'undefined'

export const UA = isBrowser && window.navigator.userAgent.toLowerCase()
export const isIE = UA && /msie|trident/.test(UA)