const router = require('express').Router();
// Verify token
const authCtrl = require("../middlewares/authJwt");
// Get all user controllers
const userCtrl = require("../controllers/user.controller");

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post("/signin", userCtrl.signin);
router.post("/signup", userCtrl.signup);
router.post("/create", [authCtrl.verifyToken, authCtrl.isAdmin], userCtrl.createUser);

module.exports = router;