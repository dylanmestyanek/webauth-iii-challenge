const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

const secrets = require("../config/secrets");
const Users = require("../models/users-model");
const validateLogin = require("../middleware/validateLogin-middleware");
const validateRegistration = require("../middleware/validateRegistration-middleware");

// POST - register user
router.post("/register", validateRegistration, (req, res) => {
    const user = req.body;

    const hash = bcrypt.hashSync(user.password, 12);

    user.password = hash;

    Users.add(user)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({ error: "Server failed to add user to the database." }))
});

// POST - login user
router.post("/login", validateLogin, (req, res) => {
    const { username, password } = req.body;

    Users.getByUsername(username)
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {

            const token = generateToken(user);

            res.json({ message: `Welcome, ${user.username}!`, token })
        } else {
            res.status(401).json({ message: "Please provide valid credentials." })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Failure to log in. Please try again later." })
    })
});

function generateToken(user) {
    const subject = {
        id: user.id,
        username: user.username
    }
    
    const options = { expiresIn: '8h' }

    return jwt.sign(subject, secrets.jwtSecret, options);
};

module.exports = router;