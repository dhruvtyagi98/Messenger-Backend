var jwt   = require('jsonwebtoken');
const User= require('../models/User');

exports.getUser = async(req, res) => {
    if (!req.body.email) {
        return res.send({
            message: "Email is required"
        });
    }
    var user = await User.findOne({
		email: req.body.email
	});

    return res.send({
        user: user
    });
}