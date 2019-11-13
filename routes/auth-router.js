const bcrypt = require("bcryptjs");
const router = require("express").Router();

const Users = require("../models/users-model");

// POST - register user
router.post("/register", (req, res) => {
    const user = req.body;

    const hash = bcrypt.hashSync(user.password, 12);

    user.password = hash;

    Users.add(user)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({ error: "Server failed to add user to the database." }))
});

// POST - login user
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    Users.getByUsername(username)
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            res.json({ message: `Welcome, ${user.username}!` })
        } else {
            res.status(401).json({ message: "Please provide valid credentials." })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Failure to log in. Please try again later." })
    })
});

module.exports = router;