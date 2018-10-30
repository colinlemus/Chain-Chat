module.exports = (app) => {
    const server = require('http').Server(app);
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        })
    });
    
    io.on('connection', (socket) => {
        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
            console.log('message: ' + msg);
            socket.send('Message: ' + msg);
        });
    });

    io.listen(8081);
    return io;
}