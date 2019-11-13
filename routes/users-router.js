const router = require("express").Router();

const Users = require("../models/users-model");
const restricted = require("../auth/restricted-middleware");

// GET - all users 
router.get("/", restricted, (req, res) => {
    Users.get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: "The server failed to get all users." }))
});

module.exports = router;