module.exports = (socket, translation) => {
    console.log('1');
    socket.on('chat message', (message) => {
        console.log('message: ' + translation);
        socket.send('Message: ' + translation);
    });
}