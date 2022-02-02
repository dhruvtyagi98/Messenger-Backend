const { group } = require('console');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let groupSchema = new Schema({
	name:     {type:String,reqiured:true},
    members:  {type:Array},
    admin:    {type:String,required:true}
})

module.exports= mongoose.model('Group',groupSchema)
