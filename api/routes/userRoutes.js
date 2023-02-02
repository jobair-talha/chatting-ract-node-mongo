const { allUsers, findUserById } = require("../controller/user");

const router = require("express").Router();

// Users Routes
router.get("/", allUsers);
router.get("/:id", findUserById);

module.exports = router;
