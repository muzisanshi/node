const Koa = require('koa');
const app = new Koa();
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);
const port = 8082;

server.listen(port, () => {
     console.log(`app run at : http://127.0.0.1:${port}`);
});

io.on('connection', socket => {

    socket.on('msg', data => {
        console.log('msg:'+data);
        socket.emit('msg','我是来自服务端的socket消息');
    });

});