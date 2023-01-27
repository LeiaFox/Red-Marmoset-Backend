const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const testUsers = [
  {username: "testuser", email: "test@example.com", password: "password123"},
  {username: "anotheruser", email: "another@example.com", password: "password456"},
];

app.post('/login', (req, res) => {
  // check if user exists in the database
  // and if the password matches
  let user = testUsers.find(user => user.username === req.body.username && user.password === req.body.password);
  if (user) {
    // create and sign a JWT and send it back to the client
    const token = jwt.sign({user}, 'your_secret_key');
    res.json({token});
  } else {
    // send an error message
    res.status(401).json({error: 'Invalid login credentials'});
  }
});

app.listen(8080, () => {
  console.log('Server started on http://localhost:8080');
});