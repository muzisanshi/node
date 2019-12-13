
const Koa = require('koa');
const Http = require('http');
const SocketIo = require('socket.io');

class Socket {

	constructor(){
		super();
		this.app = new Koa();
		this.server = Http.Server(this.app.callback());
		this.io = SocketIo(this.server);
	}

	// 启动服务
	async start(port){
		return await new Promise((resolve,reject)=>{
			this.server.listen(port, () => {
			     console.log(`socket run at : http://127.0.0.1:${port}`);
			     resolve();
			});
		});
	}

	// 关闭所有socket
	stop(){
		this.io.close();
	}

	// 监听socket的消息
	listen(callback){
		this.io.on('connection', socket => {
			
		    socket.on('msg', data => {
		        callback(data,socket);
		    });
		    
		});
	}

	// 广播给所有socket
	broadcast(socket,data){
		socket.emit(data);
		socket.broadcast.emit(data);
	}


}

module.exports = {
	Socket
}
