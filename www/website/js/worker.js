
setTimeout(function(){
	console.log("I'm worker!");
	self.postMessage("hello main thread");
},3000);
self.addEventListener("message",function(msg){
	console.log(msg.data)
	self.close();
})