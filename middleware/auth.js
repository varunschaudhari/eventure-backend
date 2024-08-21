const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const JWT_SECRET = config.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');

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

const verifyOrganizer = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        if (req.user.role !== 'organizer') {
            return res.status(403).json({ message: 'Access denied. Only organizers can perform this action.' });
        }

        next();
    });
};

module.exports = { verifyToken, verifyOrganizer };
