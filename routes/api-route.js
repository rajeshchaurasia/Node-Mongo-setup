var express = require('express');
var router = express.Router();
const notes = require('../controllers/note.controller.js');
const user = require('../controllers/user.controller.js');

const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../auth/auth');
// ---------------  user sign up and logged in ------------

router.post('/signup', passport.authenticate('signup', { session : false }) , async (req, res, next) => {
  res.json({
    message : 'Signup successful',
    user : req.user
  });
});


// ------------  User login API -----------------------
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {     try {
      if(err || !user){
        const error = new Error('An Error occurred')
        return next(error);
      }
      req.login(user, { session : false }, async (error) => {
        if( error ) return next(error)
        //We don't want to store the sensitive information such as the
        //user password in the token so we pick only the email and id
        const body = { _id : user._id, email : user.email };
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user : body },'top_secret');
        //Send back the token to the user
        return res.json({ body:body, token:token });
      });     } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// ------------------  Notes APIs route ------------------
router.post('/notes', notes.create);
    // Retrieve all Notes
router.get('/notes', notes.findAll);

// Retrieve a single Note with noteId
router.get('/notes/:noteId', notes.findOne);

// Update a Note with noteId
router.put('/notes/:noteId', notes.update);

// Delete a Note with noteId
router.delete('/notes/:noteId', notes.delete);


// ------------------  file upload roue ------------------

router.post('/add', user.add);

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
      res.json({"message": "Welcomess to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});

});

module.exports = router;
