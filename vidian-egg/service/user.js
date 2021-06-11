const delay = (data, tick) => new Promise((resolve, reject) =>{
    setTimeout(()=>{
        resolve(data)
    }, tick)
})

module.exports = {
    getName: () => delay('vidian-lee', 2000),
    getAge: () => 28
}