var userProfiles = require("../models/user-profiles.js");
module.exports = function(app){
    app.get("/api/user-profiles/:user", (req, res) => {
        const {user} = req.params;
        userProfiles.findAll({
            where: {
                userEmail: user
            }
        }).then((result) => {
            return res.json(result);
        })
    })
}