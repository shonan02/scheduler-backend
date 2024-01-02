const db = require("../db/postgres-config");

const saveFacebookUser = async (req, res) => {
    //Save the facebook user to the Facebook database
    db.pool.query("INSERT INTO Facebook (facebook_username, facebook_access_key) VALUES ($1, $2);",
    [],
    (err, result) => {

    });
}

module.exports = {
    saveFacebookUser
};