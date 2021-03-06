const { group } = require('console');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let userSchema = new Schema({
	name:     {type:String,reqiured:true},
	email:    {type:String,reqiured:true},
	phone:    {type:String,reqiured:true},
	password: {type:String,reqiured:true},
	token:    {type:String,required:false},
	contacts: {type:Array, required:false},
	groupId:  {type:Array},
	chatId:   {type:Array}
})

module.exports= mongoose.model('User',userSchema)
