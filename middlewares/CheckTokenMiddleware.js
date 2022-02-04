var jwt   = require('jsonwebtoken');

module.exports = function(req, res, next){
    tokenGet = req.query.token;
    tokenPost = req.body.token;
    if (!tokenGet || tokenPost) {
        return res.send({
            message: "Authentication Failed, token invalid."
        });
    }
    if (tokenPost) {
        jwt.verify(tokenPost, 'secret', function (err, decoded) {
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
    if (tokenGet) {
        jwt.verify(tokenGet, 'secret', function (err, decoded) {
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
}