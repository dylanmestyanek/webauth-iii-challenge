const bcrypt = require("bcryptjs");
const router = require("express").Router();

const Users = require("../models/users-model");
const validateUser = require("./validateUser");
const generateToken = require("./generateToken");

// POST - register user
router.post("/register", (req, res) => {
    const user = req.body;
    const validationResult = validateUser(user, req.path);
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    if (validationResult.isSuccessful) {
        Users.add(user)
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ error: "Server failed to add user to the database." }))
    } else {
        res.status(400).json({
            message: "Invalid credentials, please refer to errors.",
            errors: validationResult.errors
        })
    }

});

// POST - login user
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const validationResult = validateUser(req.body, req.path);

    if (validationResult.isSuccessful) {
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
            res.status(500).json({ error: "Failure to log in. Please try again later." })
        })
    } else {
        res.status(400).json({ 
            message: "Invalid credentials, please refer to errors.",
            errors: validationResult.errors
        })
    }

});



module.exports = router;