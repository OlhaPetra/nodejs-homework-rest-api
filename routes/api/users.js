const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/users");
const {authenticate, upload} = require("../../middlewares");

router.get("/current", authenticate, ctrl.currentUser);
router.get("/logout", authenticate, ctrl.logout);
router.patch("/subscription", authenticate, ctrl.updateSubscription);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.avatar);

router.get("/verify:verificationToken", ctrl.verificationToken);
router.post("/verify", ctrl.verify);

module.exports = router;