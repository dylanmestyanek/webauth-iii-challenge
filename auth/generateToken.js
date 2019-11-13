const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

module.exports = user => {
    const subject = {
        id: user.id,
        username: user.username
    }
    
    const options = { expiresIn: '8h' }

    return jwt.sign(subject, secrets.jwtSecret, options);
};