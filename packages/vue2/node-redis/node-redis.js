const redis = require('redis')

let conn = redis.createClient({port: 6379})

conn.set('name', 'lsf', redis.print)
conn.get('name', redis.print)

conn.hset('person', 'name', 'zzz',redis.print)
conn.hset('person', 'age', '20',redis.print)

conn.hget('person','name',redis.print)

//支持批量操作，其中有一个失败不受影响
conn.multi().set('x',1).set('y',2).exec(redis.print)

conn.on('message', function(channel, data){
    conn.del(data, redis.print)
})
conn.subscribe('a')

// let conn2 = redis.createClient({port: 6379})
// conn2.publish('a', 'name')
