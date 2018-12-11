let name = [{name:'shreekar'}, {name: 'mahesh'}];
console.log(name);
let anotherName = [{name: 'ganesh'}];
let newNames = [name, ...anotherName];
console.log(newNames);