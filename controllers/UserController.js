var jwt   = require('jsonwebtoken');
const User= require('../models/User');

exports.getUser = async(req, res) => {
    if (!req.body.token || !jwt.verify(req.body.token, 'secret')) {
        return res.send({
            message: "Authentication Failed, token invalid."
        });
    }

    var user = await User.findOne({
		token: req.body.token
	});

    return res.send({
        user: user
    });
}