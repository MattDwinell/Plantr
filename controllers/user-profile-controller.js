var userProfiles = require("../models/user-profiles.js");
module.exports = function(app){
    app.get("/api/user-profiles/:user", (req, res) => {
        const {user} = req.params;
        userProfiles.findAll({
            where: {
                email: user
            }
        }).then((result) => {
            return res.json(result);
        })
    })

    app.post("/api/new-user", (req, res)=>{
        const {email, userName, address, contactEmail, imageUrl, summary, plants, hasGarden, needsGarden, organic, pets, age, hours, avatar} = req.body;
        console.log(plants, hasGarden, needsGarden, organic);
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
    .then((result)=>{
        return res.json(result);
    })
    })
    app.get('/api/search/:userEmail/:distance/:garden/:organic/:pets', (req,res)=>{
        const {userEmail, distance, garden, organic, pets} = req.params;
        console.log(userEmail, distance);
        return ('hit route')
    })
}