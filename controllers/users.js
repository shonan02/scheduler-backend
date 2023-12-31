const db = require("../db/postgres-config");

//Get user by id
const getUser =(req, res) => {
    const id = parseInt(req.params.id);

    //Create query 
    db.pool.query('SELECT * FROM users WHERE user_id=$1',
        [id],
        (err, results) => {
            if(err) {
                throw err;
            }
            res.status(200).json(results.rows);
        })
}

//Get user by username
const getUserByUsername = (req,res) => {
    const { username } = req.body;

    db.pool.query("SELECT * FROM users WHERE username=$1",
    [username],
    (err, results) => {
        if(err) {
            res.status(404).json({error: "Cannot find user"});
            return;
        }
        res.status(200).send(results.rows);
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
    getUser,
    getUserByUsername
}