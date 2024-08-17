const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const JWT_SECRET = config.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');

    console.log('authHeader', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

exports.verifyOrganizer = (req, res, next) => {
    console.log('1111111111111');
    exports.verifyToken(req, res, () => {
        console.log('bbbbbbbbbb');
        if (req.user.role !== 'organizer') {
            return res.status(403).json({ message: 'Access denied. Only organizers can perform this action.' });
        }
        next();
    });
};
