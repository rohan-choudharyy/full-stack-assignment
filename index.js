const express = require('express')
const app = express()
const port = 3001
const USERS = [];
const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];
const SUBMISSION = [
]

app.post('/signup', function(req, res) {
  // Add logic to decode body
  // body should have email and password

  const {email, password} = req.body;

  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)
  if(!USERS.find((user) => user.email === email)){
    USERS.push({email, password});
    return res.status(200).send("SignUp sucessfull")
  }

  return res.status(409).send('User Already exists')

  // return back 200 status code to the client
  res.send('Hello World!')
})

app.post('/login', function(req, res) {

  // Add logic to decode body
  // body should have email and password
  const {email, password} = req.body;

  // Check if the user with the given email exists in the USERS array
  const user = USERS.find((user) => user.email === email)
  if(!user) return res.status(409).send('this email does not exist')

  // Also ensure that the password is the same
  // If the password is not the same, return back 401 status code to the client
  if(user.password !== password) return res.status(401).send('invalid password')


  // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client


  res.send('Hello World from route 2!')
  const token = "harkiratsFullStackAssignment";
  res.status(200).send({token})
})

app.get('/questions', function(req, res) {

  //return the user all the questions in the QUESTIONS array
  res.send("Hello World from route 3!")
  res.send(QUESTIONS)
})

app.get("/submissions", function(req, res) {
   // return the users submissions for this problem
  res.send("Hello World from route 4!")
  res.send(SUBMISSION)
});


app.post("/submissions", function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
   const isAccepted = Math.random() < 0.5;
   // Store the submission in the SUBMISSION array above
  res.send("Hello World from route 4!")
   SUBMISSION.push(req.body);

   if(isAccepted)
   {
    res.status(200).send('Accepted')
   } else{
    res.status(409).send('Wrong Answer');
   }

});

// leaving as hard todos