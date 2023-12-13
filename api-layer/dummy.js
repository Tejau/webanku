const hashlib = require("hashlib");
string = "saltedpassword";
let x = hashlib.sha256(string.encode()).hexdigest();
console.log(x);
let y = hashlib.sha256(string.encode()).hexdigest();
console.log(y);

