const router = require("express").Router();

const authRouter = require("../auth/auth-router");
const userRouter = require("../routes/users-router");

router.use("/auth", authRouter);
router.use("/users", userRouter);

module.exports = router;