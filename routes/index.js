const express = require("express");
router = express.Router();

const {
    scanQuickResponseCode,
} = require("../controllers/index");

router.post("/scan", scanQuickResponseCode);


module.exports = router;
