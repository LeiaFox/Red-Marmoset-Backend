const express = require('express');

const cors = require('cors');
const jwt = require("jsonwebtoken")

const app = express();
const bodyParser = require("body-parser");

const categories = [
  {
    title: "Announcents",
    description: "Info on the latest updates",
    postnum: 25082,
    discnum: 70,
    discussions: {
      title: "Unreleased ball?",
      author: "stin",
      text: "WHERE IS THE UNRELESED BALL I NEED IT",
      replynum: 3,
      viewnum: 254,
      replies: {
        text: "you are the website you are the website you are the website you are the webste",
        author: "REVOLVING CAT",
        
      }
    }
  }
]

const testUsers = [
  {username: "testuser", email: "test@example.com", password: "password123"},
  {username: "anotheruser", email: "another@example.com", password: "password456"},
];

app.use(cors({
  origin: '*', // replace with the address of your frontend
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  // check if user exists in the database
  // and if the password matches
  let user = testUsers.find(user => user.username === req.body.username && user.password === req.body.password);
  if (user) {
    // create and sign a JWT and send it back to the client
    const token = jwt.sign({user}, 'your_secret_key');
    res.json({
      token
    });
  } else {
    // send an error message
    res.status(401).json({error: 'Invalid login credentials'});
  }
});

app.use(express.static('routes'));

app.listen(8080, () => {
  console.log('Server started on http://localhost:8080');
});