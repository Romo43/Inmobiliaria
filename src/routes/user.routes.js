const router = require('express').Router();
// Verify token
const authCtrl = require("../middlewares/authJwt");
// Get all user controllers
const userCtrl = require("../controllers/user.controller");

// 
router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// Login
router.post("/login", userCtrl.login);
// Register
router.post("/register", [authCtrl.checkDuplicateEmail], userCtrl.register);
// Create admin, employee or user
router.post("/create", [authCtrl.verifyToken, authCtrl.onlyAdmin, authCtrl.checkDuplicateEmail], userCtrl.createUser);

module.exports = router;