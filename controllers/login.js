const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("./../db/postgres-config");

const login = async (req, res) => {
    const { username, password } = req.body;

    //Find user from the db
    const query = "SELECT * FROM users WHERE username=$1 LIMIT 1;"
    const result = await db.pool.query(query, [username]);
    console.log(result);
    if(result.rowCount > 0) {
        const passwordVerify = await bcrypt.compare(password, result.rows[0].password);
        console.log(passwordVerify);
        if(passwordVerify) {
            const tokenForUser = {
                username: username
            }

            const token = jwt.sign(tokenForUser, 'token-secret');

            res.status(200).send({
                token,
                username
            })
        }
    } else {
        res.status(400).json({ error: "invalid username or password"});
    }

}

module.exports = {
    login
}