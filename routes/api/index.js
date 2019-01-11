const router = require("express").Router();
const loginRoutes = require("./login");


//Login routes
router.use("/login", loginRoutes);


module.exports = router;
