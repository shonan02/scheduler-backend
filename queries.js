const db = require("./postgres-config");

//Create user query
const createUser = (req, res) => {
    const { username, email, password } = req.body;

    db.pool.query("INSERT INTO users (username, email, password) VALUES ($username, $email, $password) RETURNING *;",
        [username, email, password],
        (err, result) => {
            if(err) {
                throw err;
            }

            res.status(201).send("user added.");
        })
}

module.exports = {
    createUser
}