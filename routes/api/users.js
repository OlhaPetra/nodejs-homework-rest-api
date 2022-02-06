const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/users");
const {authenticate} = require("../../middlewares");

router.get("/current", authenticate, ctrl.currentUser);
router.get("/logout", authenticate, ctrl.logout);
router.patch("/subscription", authenticate, ctrl.updateSubscription);

module.exports = router;