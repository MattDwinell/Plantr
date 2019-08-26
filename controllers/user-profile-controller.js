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

    app.get("/api/new-user", (req, res)=>{
        const {email, userName, address, contactEmail, imageUrl, summary, plants, hasGarden, needsGarden, organic, pets, age, hours, avatar} = req.body;
    userProfiles.create({
        email: email,
        contactEmail: contactEmail,
        userName: userName,
        address: address,
        imageUrl: imageUrl,
        summary: summary,
        plants: plants,
        hasGarden: hasGarden,
        needsGarden: needsGarden,
        organic: organic,
        pets: pets,
        age: age,
        hours: hours,
        avatar: avatar
    })
    })
}