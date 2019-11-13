module.exports = (req, res, next) => {
    const user = req.body;

    if (!user.username || !user.password) {
        res.status(400).json({ message: "Please provide username and password." })
    } else {
        next();
    }
}