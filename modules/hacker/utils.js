
const SocketIo = require('socket.io');

class SocketManager {

	// 启动服务
	start(port){
		this.io = SocketIo(port);
		return this;
	}
	
	// 关闭所有socket
	stop(){
		this.io.close();
		return this;
	}
	
	// 监听socket的消息
	listen(callback){
		this.io.on('connection', socket => {
			
		    socket.on('msg', data => {
		        callback(data,socket);
		    });
		    
		});
		return this;
	}

	// 广播消息给所有socket
	broadcast(data){
		this.io.sockets.emit('broadcast',data);
		return this;
	}

}

module.exports = {
	SocketManager
}
