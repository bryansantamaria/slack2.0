const express = require('express');
const request = require('request-promise');
const router = express.Router();

//Get all chatrooms.
router.get("/", function(req, res) {
  request("http://127.0.0.1:3000/chatroom/", {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(chatroom => {
    res.json(chatroom);
  });
});

//GET specific chatroom.
router.get("/:_id", function(req, res) {
  request("http://127.0.0.1:3000/chatroom/" + req.params._id, {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(chatroom => {
    res.json(chatroom);
  });
});

router.post('/', (req, res) => {
  request("http://127.0.0.1:3000/chatroom", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req.body)
  }).then(chatroom => {
    res.json(chatroom);
  });
})

module.exports = router;
