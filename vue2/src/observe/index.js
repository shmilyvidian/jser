import { isArray, isObject } from "../utils"
import arrayMethods from "./array"
export function observe(value){
    if(!isObject(value)) return
    //需要对对象进行观测
    if(value.__ob__) return value.__ob__
    return new Observe(value)
}

class Observe {
    constructor(value){
        Object.defineProperty(value, "__ob__", {
            value: this,
            enumerable: false //不能被枚举就不会被遍历到,否则会造成响应式死循环
        })
        if(isArray(value)){
            value.__proto__ = arrayMethods
            this.observeArray(value)
        }else{
            this.walk(value)
        }
    }
    observeArray(data){
        data.forEach(item => observe(item))
    }
    walk(data){
        Object.keys(data).forEach(key => {
            defineReactive(data, key, data[key])
        })
    }
}

function defineReactive(obj, key, value){
    observe(value)
    Object.defineProperty(obj, key, {
        get(){
            return value
        },
        set(newVal){
            if(newVal === value) return
            observe(newVal)
            value = newVal
        }
    })
}