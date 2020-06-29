
setTimeout(function(){
	console.log("I'm worker!");
	self.postMessage("hello main thread");
},3000);
self.addEventListener("message",function(msg){
	console.log(msg.data)
	// self.close();
})

let calculate = function(t){
	let total = 0;
	for(let i = 1;i < t;i++){
		total += i;
	}
	return total;
}

self.postMessage(calculate(1000));
self.close();

