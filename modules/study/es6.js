let {a:{b}} = {a:{b:"fuck"}};
let [{c:cv,d = "fuck you you"}] = [{c:"fuck you",d:"nice"}];
let [e = "default"] = ["like"];
let out;
({out} = {out:"yes"});
const [a1,a2,a3] = "lei";

let func = ([a4,a5])=>{
return a4+a5;
};

for(let v of "nice"){
// console.log(v);
}

for(let i in {a:"a",b:"b"}){
// console.log(typeof i);
}

let fuck = " fuck like";
let temp = `${fuck}`;

let eight = 0o10;
let binary = 0b1010;

let func2 = function(a=0,b=0){
return a+b;
}

let func3 = function(a,...b){
return a+b[0];
}

let obj = {name:"lilei",age:"30"};
let sp = {...obj};

let func4 = function(){};
let func5 = (a,b)=>({a:a,b:b});

["a","b","c"].map((v,i)=>v);

let func6 = ()=>{};
// let funcObj = new func6();

let arr = [1,2,3];
let arr2 = [4,5,6];
arr.push(...arr2);


let arr3 = "";

let arr4 = [1,2,3,4,5];
let [first,...last] = arr4;

let arr5 = new Array(3);
let arr6 = Array(3);

let big = [1,2,3,4].find((it) => {
return it > 3;
});

arr4.fill(6);
let arr7 = [1,[2,[3]]].flat();

let key = "cao";
let obj2 = {
arr4,
arr7,
fuck(){
  console.log(JSON.stringify(this.arr7));
},
"wo cao":"heihei",
[key]:"caonima",
['ff'](){
  // console.log("ff");
}
}
let father = {
key:"father"
}
let son = {
key:"son",
info(){
  // console.log(super.key);
}
}
Object.setPrototypeOf(son,father);
// obj2.fuck();
son.info();

let obj3 = {
a:1,
b:2
};
let obj4 = {
b:3,
c:4
};
let obj5 = {...obj3,...obj4};

let equal = Object.is({},{});
equal = {}==={};

obj5 = {a:"a",[Symbol()]:"呵呵"};
Object.defineProperty(obj5,"b",{
	configurable:true,
	writable:true,
	enumerable:false,
	value:"b"
});
let {a:aa,b:bb} = obj5;
for(let item in obj5){
// document.write(item);
}
let sb = Symbol("a");
let sb2 = Symbol("a");
let sb3 = Symbol.for("a");
let sb4 = Symbol.for("a");

obj2 = {a:"a"};
obj3 = {b:{c:"c"}};
Object.assign(obj2,obj3);
obj3.b.c = "d";

obj2 = [1,2];
obj3 = [1,3,5];
Object.assign(obj2,obj3);

obj2 = {a:"a"};
Object.preventExtensions(obj2);
obj2.b = "b";
Object.seal(obj2);
delete obj2.a;
Object.freeze(obj2);
obj2.a = "aa";

let vv = "getr";
obj2 = {
	get getr(){
	  return vv + (new Date()).toString();
	},
	set getr(v){
		vv = v;
	},
	mname:'嘿嘿'
}
obj2.getr = vv;
let target = {a:1};
Object.assign(target,obj2)
// console.log(Object.getOwnPropertyDescriptor(obj2,'getr'))


// async异步操作
let timeout = async function(){
	// console.log("after timeout1");
	await new Promise((resolve,reject)=>{
		setTimeout(()=>{
			resolve("after timeout2");
		}, 5000);
	});
	console.log("after timeout3");
	return "ok"
};
// let p = timeout();
// p.then((r)=>{
// 	// console.log(r);
// })

// set和map
let set = new Set([1,2,3,4,5,6,"6"]);
// set = new WeakSet([[1,2]]);
set.add("fuck");
set.delete(1)
// set.clear();
for(let i of set){
	// console.log(i)
}
set.forEach((it,id)=>{
	// console.log(it)
})

let map = new Map();
let key2 = {name:"name",age:18};
let val = "lilei";
map.set(key2,val);
map = new Map([["name","lilei"],["age",22]]);
for(let [k,v] of map.entries()){
	// console.log(v);
}
arr7 = [...map.entries()];

Reflect.defineProperty(key2,"age",{
	writable:false
})
key2.age = 19;
Reflect.deleteProperty(key2,"age");

class MyClass{
	static prop1 = 1;
	static #prop2 = 2;
	["#p"](){
		console.log("I'm pfunc")
	}
}
class Father{
	constructor(){
		this.age = 40;
	}
	static func(){
		// console.log(this.age)
	}
}
Father.age = 0;
class Son extends Father{
	constructor(){
		super();
		this.age = 20;
	}
	static myFunc(){
		super.func();
	}
}
Son.age = 1;
Son.myFunc();



let c = {
	["#name"]:""
};
Object.defineProperty(c,"#name",{
	configurable:false,
	enumerable:false
});
Object.defineProperty(c,"name",{
	enumerable:true,
	configurable:true,
	get:function(){
		return this["#name"];
	},
	set:function(v){
		this["#name"] = v+"_set";
	}
});
c.name = "lilei";
for(let key in c){
	// console.log(key);
}
console.log(c.hasOwnProperty('name'));
console.log(Object.getOwnPropertyDescriptor(c,'name'));



































