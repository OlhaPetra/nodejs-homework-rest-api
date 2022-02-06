const express = require("express");
const router = express.Router();

const {authenticate}=require("../../middlewares")

const ctrl = require("../../controllers/contacts");

router.get("/", authenticate, ctrl.getAll);
router.get("/:id", ctrl.getById);
router.post("/", authenticate, ctrl.add);
router.put("/:id", ctrl.updateById);
router.patch("/:id/favorite", ctrl.updateFavorite);
router.delete("/:id", ctrl.removeById);

module.exports = router;
