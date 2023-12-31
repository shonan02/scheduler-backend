const express = require("express");
const app = express();

const userController = require('./controllers/users');

//Middleware declarations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Define routes
app.get("/", (req, res) => {
    res.status(200).json({message: "correct"});
})

app.get("/users/:id", userController.getUser);
app.post("/users", userController.createUser);


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
