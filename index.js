const express = require("express");
const app = express();

const userController = require('./controllers/users');
const loginController = require('./controllers/login');

//Middleware declarations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Define routes
app.get("/", (req, res) => {
    res.status(200).json({message: "correct"});
})

//User controller routes
app.get("/users", userController.getUserByUsername);
app.get("/users/:id", userController.getUser);
app.post("/users", userController.createUser);

//Facebook api
app.post("link/facebook", )
//Login controller
app.post('/login', loginController.login);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
