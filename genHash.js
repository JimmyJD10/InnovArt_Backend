const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('JDadmin96', 10);
console.log(hash);
