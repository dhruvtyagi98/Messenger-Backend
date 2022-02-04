const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let chatSchema = new Schema({
	senderEmail   : {type:String, required:true},
	receiverEmail : {type:String, required:true},
    content       : {type:Array, required:false},
})

module.exports= mongoose.model('Chat',chatSchema)