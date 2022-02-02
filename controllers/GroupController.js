const User = require('../models/User');
const Group = require('../models/Group');
var jwt    = require('jsonwebtoken');

exports.createGroup = async(req, res) => {
    if (!req.body.name) {
        return res.send({
            message: "Group Name is required"
        });
    }
    if (!req.body.email) {
        return res.send({
            message: "User Email is required"
        });
    }

    var user = await User.findOne({
		email: req.body.email
	});
    if (!user) {
        return res.send({
            message: "User Does not Exist."
        });
    }

    group = new Group({
		name: req.body.name,
		members: [user.email],
        admin: user.email
	});

    group = await group.save();

    if (group) {
        user = await User.findOneAndUpdate({email:req.body.email},{$push : {groupId: [{name:req.body.name,id:group.id}]}});

        if (user) {
            return res.send({
                message: 'Group Created.'
            });
        }
    }
}

exports.addToGroup = async(req, res) => {
    if (!req.body.id) {
        return res.send({
            message: "Group ID is required"
        });
    }
    if (!req.body.admin_email) {
        return res.send({
            message: "Admin Email is required"
        });
    }
    if (!req.body.member_email) {
        return res.send({
            message: "Member Email is required"
        });
    }

    group = await Group.findOneAndUpdate({_id:req.body.id}, {$push: {members: req.body.member_email}});

    if (group) {
        user = await User.findOneAndUpdate({email:req.body.member_email},{$push : {groupId: [{name:group.name,id:group.id}]}});

        if (user) {
            return res.send({
                message: 'Added to Group.'
            });
        }
    }
}