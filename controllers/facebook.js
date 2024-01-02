const db = require("../db/postgres-config");

//Save facebook user access token 
const saveFacebookUser = async (req, res) => {
    const { userId, userDisplayName, accessToken } = req.body;

    //Create query
    const query = "INSERT INTO Facebook (user_id, facebook_username, facebook_access_key) VALUES ($1, $2, $3);";

    db.pool.query(query,
        [userId, userDisplayName, accessToken],
        (err, results) => {
            if(err) {
                return res.status(400).json({ err: err});
            }

            res.status(201).json({ message: "successful"});
        });
}

module.exports = {
    saveFacebookUser
};