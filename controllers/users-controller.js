const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
// const users = [];
const userModel = require('../models/users-model');
const JWT_SECRET = config.JWT_SECRET;
const createUser = async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ message: 'username , password and role are required' });
    }

    // Check if user already exists
    const userExists = userModel.findUserByUsername(username);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, config.JWT_SALT);

    // Store user details
    const newUser = {
        id: userModel.getAllUsers().length + 1,
        username,
        password: hashedPassword,
        role
    };
    userModel.addUser(newUser);

    res.status(201).json({ message: 'User registered successfully' });
};

const login = async (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find the user by username
    const user = userModel.findUserByUsername(username);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' }); // Use 401 status code
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' }); // Consistent error for invalid credentials
    }

    // Generate a JWT token
    const token = jwt.sign(
        { id: user.id, username: user.username },  // Include user ID in the payload
        JWT_SECRET,  // Replace with your secret key
        { expiresIn: '1h' } // Optional: Set token expiration
    );

    // Respond with the generated token
    res.json({ token });
};


module.exports = { createUser, login };
