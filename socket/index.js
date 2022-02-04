const { createChat } = require('../controllers/ChatController');

module.exports = (io) => {
    io.on('connection', socket => {
        console.log('new connection');
		socket.on('sendMessage', (data) => createChat(socket, data));        
	})
}