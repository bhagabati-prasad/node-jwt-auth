const { Router } = require("express");
const authController = require("../controllers/authController");

const router = Router();

/*

/signup     GET     sign up page
/login      GET     log in page
/signup     POST    create a new user in db
/login      POST    authenticae a current user
/logout     GET     log out a user

*/

router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);

module.exports = router;
