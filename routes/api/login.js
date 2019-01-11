const router = require("express").Router();
const loginController = require("../../controllers/loginController");


// Matches with "/api/login/signup" for full tree
// Matches with "/signup" without index.js nesting 
router.route("/signup")
  .post(loginController.signUp);


// Matches with "/api/login/signin" for full tree
// Matches with "/signin" without index.js nesting
router.route("/signin")
  .post(loginController.signIn);


// Matches with "/api/login/verify" for full tree
// Matches with "/verify" without index.js nesting
router.route("/verify")
  .get(loginController.verify);


// Matches with "/api/login/logout" for full tree
// Matches with "/logout" without index.js nesting
router.route("/logout")
.get(loginController.logout);


module.exports = router;
