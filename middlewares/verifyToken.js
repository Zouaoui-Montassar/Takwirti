const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    console.log(token);
    jwt.verify(token, 'webseckey', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.userId;
        next();
    });
}

module.exports = verifyToken;

