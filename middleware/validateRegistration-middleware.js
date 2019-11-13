module.exports = (req, res, next) => {
    const user = req.body;

    if (!user.username || !user.password || !user.department) {
        res.status(400).json({ message: "Please provide username, password, and department." })
    } else {
        next();
    }
}