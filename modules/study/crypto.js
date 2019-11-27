
const c = require('crypto');

const key = c.randomBytes(16).toString();
console.log("key:"+key);
const hmac = c.createHmac('sha256', key);
hmac.update("Li8728428850");
console.log(hmac.digest('hex'));