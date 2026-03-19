const jwt = require('jsonwebtoken');

const auth = async (req,res,next) => {
 try {
    const token = req.header('Authorization').replace('Bearer ','');

    const decoded = jwt.verify(token, 'mysecretkey');

    req.user = decoded;

    next();
 } catch (error) {
    return res.status(400).json({message: "Unauthorized"});
 }
}

module.exports = auth;