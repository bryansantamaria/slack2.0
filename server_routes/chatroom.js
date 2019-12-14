const express = require('express');
const router = express.Router();

router.put('/', (req, res) => {
  var pipelineDB = req.db;
  var collection = pipelineDB.get('chatrooms');
  console.log('Recieved message from app >');
  console.log(req.body);
  collection.insert({ //Inserts message to DB
    'alias': req.body.alias,
    'message': req.body.message,
    'timestamp': req.body.timestamp,
    'attachments': [
      {
        'url': 'localhost:27017/attachments',
        'filename': 'test.jpg'
      }
    ]
  }, (err, message_in_db) => { //Gets message back from database
    if (err) throw err;
    console.log('Inserted message in DB >');
    console.log(message_in_db);
    res.json(JSON.stringify(message_in_db)); //Returns message to app.js
  });
});

/* POST Update user. */
router.put('/edit', function (req, res) {
  var pipelineDB = req.db;
  var collection = pipelineDB.get('chatrooms');
  console.log('\n');
  console.log('Server spits out: ');
  console.log(req.body);
  collection.update({ '_id': req.body._id }, {
    $set: {
      'alias': req.body.alias,
      'content': req.body.message,
      'datetime': req.body.timestamp
    }
  }, (err) => {
    if (err) throw err;
    collection.find({ '_id': req.body._id }, function (err, edit_msg_db) {
      console.log('edit message in db >')
      console.log(edit_msg_db[0]);
      if (err) throw err;
      res.json(JSON.stringify(edit_msg_db[0]));
    });
  });
});

/* GET delete user. */
router.delete('/', function (req, res) {
  console.log('\n');
  console.log('message to be deleted >')
  console.log(req.body);
  var pipelineDB = req.db;
  var collection = pipelineDB.get('chatrooms');

  collection.remove({ '_id': req.body._id }, { 'justOne': true }, (err, delete_status) => {
    if (err) throw err;
    res.json(JSON.stringify(req.body));
    console.log(delete_status.result);
  });
});

//GET all chatrooms.
router.get('/', (req, res) => {
  let pipelineDB = req.db;
  var chatroomCollection = pipelineDB.get("chatrooms");
  chatroomCollection.find({}, (err, chatrooms) => {
    if (err) throw err;
    res.json(chatrooms);
  });
});

//POST new chatroom with given id.
router.post("/:_id", (req,res) => {
  let pipelineDB = req.db;
  let chatroomCollection = pipelineDB.get("chatrooms");
  chatroomCollection.insert({"id": req.params._id, "name":"sad"}, (err,newChatroom)=>{
    if (err) throw err;
    res.json(newChatroom);
  });
});

//GET specific chatroom.
router.get('/:_id', (req, res) => {
  let pipelineDB = req.db;
  var chatroomCollection = pipelineDB.get("chatrooms");
  chatroomCollection.find({_id: req.params._id}, (err, chatrooms) => {
    if (err) throw err;
    res.json(chatrooms);
  });
});

/*
router.get("/:_id", async (req,res) => {
  let pipelineDB = req.db;
  let mySoul = [];
  let chatroomCollection = pipelineDB.get("chatrooms");
  mySoul = await chatroomCollection.find({_id: req.params._id}).then(chatroom => {
    return chatroom;
  });
  res.json(mySoul);
});
*/

/*
router.get('/', async (req, res) => {
    let usersArray = [];
    let chatroomsArray = [];
    var pipelineDB = req.db;

    var collection = pipelineDB.get("users");
    usersArray = await collection.find().then(users => {
      return users;
    });
    let chatroomCollection = pipelineDB.get("chatrooms");
    chatroomsArray = await chatroomCollection.find().then(chatrooms => {
      return chatrooms;
    });
    console.log(usersArray);
    //console.log(usersArray);
    let chatObject = {
      users: usersArray,
      chatrooms: chatroomsArray
    };
    res.send(chatObject);
});
*/

/*
router.get('/:_id', (req, res) => {
  let pipelineDB = req.db;
  var chatroomCollection = pipelineDB.get("chatrooms");
  let checkIfIdExist = chatroomCollection.find({_id: req.paramas._id}, (err, chatrooms) => {
    if (chatrooms=="") {
      res.send("lol")
    }
    else if (err) throw err;
    else {
      res.json(chatrooms);
    }
  });
  //chatroomCollection.find({_id: req.params._id}, (err, chatrooms) => {
  //  if (err) throw err;
  //  res.json(chatrooms);
  //});
});
*/
/*
router.get('/:_id', (req, res) => {
  let pipelineDB = req.db;
  var chatroomCollection = pipelineDB.get("chatrooms");
  chatroomCollection.update(
    { _id: req.params._id},
    {
       //$set: { item: "apple" },
       $setOnInsert: {
         name:"createIfNotExist",
         members: ["member1","member2","member3"],
         messages: [{
           alias: "testUser",
           message:"my first test message",
           timestamp: "2019-12-13 13:00"
         }]
      }
    },
    { upsert: true }
  );
  /*
  chatroomCollection.find({_id: req.params._id}, (err, chatrooms) => {
    if (err) throw err;
    res.json(chatrooms);
  });
});
*/
/*
chatroomCollection.update(
  { _id: req.params._id},
  {
     //$set: { item: "apple" },
     $setOnInsert: {
       name:"createIfNotExist",
       members: ["member1","member2","member3"],
       messages: [{
         alias: "testUser",
         message:"my first test message",
         timestamp: "2019-12-13 13:00"
       }]
    }
  },
  { upsert: true }
);
*/

module.exports = router;
