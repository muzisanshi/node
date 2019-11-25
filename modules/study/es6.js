// async异步操作
let timeout = async function(){
	await new Promise((resolve,reject)=>{
		setTimeout(()=>{
			resolve("after timeout2");
		}, 5000);
	});
	console.log("after timeout1")
};
let p = timeout();
p.then((r)=>{
	console.log(r);
})