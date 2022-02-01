const User = require('../models/User');
var jwt    = require('jsonwebtoken');

exports.createContact = async(req, res) => {
    if (!req.body.name) {
        return res.send({
            message: "Name is required"
        });
    }

    if (!req.body.email) {
        return res.send({
            message: "User Email is required"
        });
    }

    if (!req.body.phone) {
        return res.send({
            message: "Phone is required"
        });
    }
    var user = await User.findOneAndUpdate({email: req.body.email},{$push :{contacts:[{name:req.body.name,phone:req.body.phone}]}});

    user = await user.save();
    if (user) {
		res.status(200).send({
		message: "Contact Added."
		});
	}
}