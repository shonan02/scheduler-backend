const db = require("../db/postgres-config");

//Get all users
const getUser =(req, res) => {
    const id = parseInt(req.params.id);

    //Create query 
    db.pool.query('SELECT * FROM users WHERE id=$1',
        [id],
        (err, results) => {
            if(err) {
                throw err;
            }
            res.status(200).json(results.rows);
        })
}

//Create user query
const createUser = (req, res) => {
    const { username, email, password } = req.body;

    db.pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;",
        [username, email, password],
        (err, result) => {
            if(err) {
                throw err;
            }

            res.status(201).send("user added.");
        })
}

module.exports = {
    createUser,
    getUser
}