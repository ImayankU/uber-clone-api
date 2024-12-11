const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs'); // Import bcrypt to hash passwords

module.exports.createUser = async ({
    firstname, lastname, email, password
}) => {
    if (!firstname || !lastname || !email || !password) {
        throw new Error('All fields are required');
    }

    const user = await userModel.create({
        firstname,
        lastname,
        email,
        password
    });

    return user;
};



