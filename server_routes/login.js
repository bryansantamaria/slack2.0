const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    var pipelineDB = req.db;
    var collection = pipelineDB.get("users");
    collection.find({ $or: [{ "alias": req.body.username}, { "email": req.body.username}] }, {}).then(user => {
        console.log(user);
        if (user[0]) {
            if (user[0].password == req.body.password) {
                res.send(user[0]);
            } else {
                res.send(false);
            }
        } else {
            res.send(false);
        }
    });
});

module.exports = router;
