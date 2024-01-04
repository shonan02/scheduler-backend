const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("./../db/postgres-config");

const login = async (req, res) => {
    const { username, password } = req.body;

    //Find user from the db
    const query = "SELECT * FROM users WHERE username=$1 LIMIT 1;";
    const result = await db.pool.query(query, [username]);

    if(result.rowCount > 0) {
        const passwordVerify = await bcrypt.compare(password, result.rows[0].password);
        if(passwordVerify) {
            const tokenForUser = {
                username: username
            }

            const token = jwt.sign(tokenForUser, 'token-secret');
            //Update the last login column
            const currentDate = new Date();
            const timeNow = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
            const query = "UPDATE users SET last_login = $1 WHERE user_id = $2;";
            const updateResult = await db.pool.query(query, [timeNow, result.rows[0].user_id]);


            res.status(200).send({
                token,
                username,
                timeNow
            })
        } else {
            res.status(400).json({error: "incorrect password"});
        }
    } else {
        res.status(400).json({ error: "invalid username or password"});
    }

}

module.exports = {
    login
}