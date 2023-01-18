const express = require("express");
const router = express.Router();

router.get("/", (__, res) => {
  try {
    return res.send(
      "it is now working fine and can communicate with the client"
    );
  } catch (e) {
    return res.send(e);
  }
});

module.exports = router;
