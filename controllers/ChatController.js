const Chat = require('../models/Chat');
const User = require('../models/User');

exports.createChat = async(req, res) => {
    chat = await Chat.find({senderEmail:req.body.senderEmail, receiverEmail:req.body.receiverEmail});

    if (chat.length === 0) {
        chat = new Chat({
            senderEmail:req.body.senderEmail,
            receiverEmail:req.body.receiverEmail,
        });

        chat = await chat.save();

        if (chat) {
            sender = await User.findOneAndUpdate({email:req.body.senderEmail}, {$push: {chatId: chat.id}});

            receiver = await User.findOneAndUpdate({email:req.body.receiverEmail}, {$push: {chatId: chat.id}});
            if (sender && receiver) {
                return res.send({
                    message: "Chat created."
                });
            }
            return res.send({
                message: "Opps Something went wrong."
            });
        } 
    }
    return res.send({
        message: "Chat already exists."
    });
}

exports.fetchAllChats = async(req, res) => {
    user = await User.findOne({email:req.query.email});
    if (!user) {
        return res.send({
            message: "User not Found."
        });
    }

    chats = await Chat.find({_id: {$in:user.chatId}});
    if (chats.length === 0) {
        return res.send({
            message: "No Chats Found."
        });
    }
    return res.send({
        message: "Chats Found.",
        data: chats
    });
}


exports.sendMessage = async(socket, data) => {

}

exports.fetchChat = async(socket, data) => {
    chats = await Chat.find({_id:data.id});
    socket.emit('fetchChat', chats);
}

