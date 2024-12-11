const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    console.log('Request Body:', req.body); // Log the full body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { fullname, email, password } = req.body;

        // Extract firstname and lastname
        const { firstname, lastname } = fullname;
        
        console.log('Parsed fields:', { firstname, lastname, email, password });

        // Hash the password
        const hashedPassword = await userModel.hashedPassword(password);

        // Create user with a default socketId (null)
        const user = await userService.createUser({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            socketId: null // Add socketId with a default value of null
        });

        // Generate auth token
        const token = user.generateAuthToken();

        // Send the response
        res.status(201).json({ token, user });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ error: 'Server Error' });
    }
};
