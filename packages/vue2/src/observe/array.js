let oldArrayPrototype = Array.prototype

let arrayMethods = Object.create(oldArrayPrototype)

let methods = [
    'push',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice'
]
methods.forEach(method => {
    arrayMethods[method] = function(...args){
        oldArrayPrototype[method].call(this, ...args)
        let inserted = []
        let ob = this.__ob__
        switch(method){
            case 'splice':
                inserted = args.slice(2)
                break;
            case 'push':
            case 'unshift':
                inserted = args
                break;
        }
        if(inserted.length > 0) {
            ob.observeArray(inserted)
        }
    }
})

export default arrayMethods