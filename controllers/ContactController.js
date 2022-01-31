const User = require('../models/User');
var jwt    = require('jsonwebtoken');

exports.createContact = async(req, res) => {
    if (!req.body.name) {
        return res.send({
            message: "Name is required"
        });
    }

    if (!req.body.phone) {
        return res.send({
            message: "Phone is required"
        });
    }

    if (!req.body.token || !jwt.verify(req.body.token, 'secret')) {
        return res.send({
            message: "Authentication Failed, token invalid."
        });
    }

    var user = await User.findOneAndUpdate({token: req.body.token},{$push :{contacts:[{name:req.body.name,phone:req.body.phone}]}});

    user = await user.save();
    if (user) {
		res.status(200).send({
		message: "Contact Added."
		});
	}
}