const cache = require('./lib/utils/cache')



cache.set('abc','123');

console.log(222);


console.log(cache.is('abc'))


console.log(cache.get("abc"))