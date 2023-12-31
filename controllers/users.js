const db = require("../db/postgres-config");

const bcrypt = require('bcrypt');

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
const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    //Hash the password 
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const currentDate = new Date();
    const created = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
    console.log(created);
    db.pool.query("INSERT INTO users (username, email, password, created) VALUES ($1, $2, $3, $4) RETURNING *;",
        [username, email, passwordHash, created],
        (err, result) => {
            if(err) {
                res.status(400).json({error: err});
                return;
            }

            res.status(201).json({message: 'success'});
        })
}

module.exports = {
    createUser,
    getUser,
    getUserByUsername
}