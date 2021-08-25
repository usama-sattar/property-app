var express = require("express");
var router = express.Router();
var usersController = require("../controllers/users");
var verify = require('../auth')

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/properties",  usersController.getAll);
router.post("/post", verify, usersController.postAd);
router.post("/post/interest", verify, usersController.postInterest);
router.get("/interest/:property", verify, usersController.countInterest);
router.get("/user/property", verify, usersController.getProperty);



module.exports = router;
