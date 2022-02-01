var jwt   = require('jsonwebtoken');

module.exports = function(req, res, next){
    if (!req.body.token) {
        return res.send({
            message: "Authentication Failed, token invalid."
        });
    }
    jwt.verify(req.body.token, 'secret', function (err, decoded) {
        if(err){
            return res.send({
                message: "Authentication Failed, token invalid."
            });
        }
        else{
            next();
        }
    });
}