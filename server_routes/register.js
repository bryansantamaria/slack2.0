const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    var userDB = req.db;
    var collection = userDB.get("users");
    collection.insert({
        "email": req.body.email,
        "password": req.body.password,
        "alias": req.body.username
    }, (err, user_in_db) => {
        if (err) throw err;
        res.send(JSON.stringify(user_in_db));
    });
});

module.exports = router;