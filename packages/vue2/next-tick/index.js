import { isIE, isNative, noop } from "./utils"

//存储nextTick的callback
const callbacks = []
//标识是否已经开始更新
let pending = false
//存放
let timerFunc
export let isUsingMicroTask = false

function flushCallbacks(){
    pending = false
    const copies =  callbacks.slice(0)
    callbacks.length = 0
    for(let i = 0; i < copies.length; i++){
        copoes[i]()
    }
}
if(typeof Promise !== 'undefined' && isNative(Promise)) {
    const p = Promise.resolve()
    timerFunc = () => {
        p.then(flushCallbacks)
    }
    if (isIOS) setTimeout(noop)
    isUsingMicroTask = true
}else if(!isIE && typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) || MutationObserver.toString === '[object MutationObserverConstructor]'
)){
    let counter = 1
    const observer = new MutationObserver(flushCallbacks)
    const textNode = document.createTextNode(String(counter))
    observer.observe(textNode, { 
        characterData: true,
    })
    timerFunc = () => {
        counter = (counter + 1) % 2
        textNode.data = String(counter)
    }
    isUsingMicroTask = true
}else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)){
    timerFunc = () => {
        setImmediate(flushCallbacks)
    }
}else{
    timerFunc = () => {
        setTimeout(flushCallbacks, 0)
    }
}

export function nextTick(callback, ctx) {
    let _resolve
    callbacks.push(() => {
        if (callback) {
            try {
                callback.call(ctx)
            } catch (error) {
                console.log(error);
            }
        } else if (_resolve) {
            _resolve(ctx)
        }
    })
    if(!pending){
        pending = true
        timerFunc()
    }
    if(!callback && typeof Promise !== 'undefined'){
        return new Promise(resolve => {
            _resolve = resolve
        })
    }
}