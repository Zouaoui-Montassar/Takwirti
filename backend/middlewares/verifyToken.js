// useless khater deja nestaamel fel passport ama khaleha yomken narj3oulha


const jwt = require('jsonwebtoken');
const secret_key = '4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd'; // secret key

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    console.log(token);
    jwt.verify(token, secret_key, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.userId;
        next();
    });
}
module.exports = verifyToken;         // useless khater deja nestaamel fel passport ama khaleha yomken narj3oulha


