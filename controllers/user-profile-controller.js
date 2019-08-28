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
        let {userEmail, distance, garden, organic, pets} = req.params;
        if(garden === 'true'){
            garden = true;
        } else {
            garden = false;
        }
        if(organic === 'true'){
            organic = true;
        } else {
            organic = false;
        }
        if(pets === 'true'){
            pets = true;
        } else {
            pets = false;
        }
        console.log(userEmail, distance);
        userProfiles.findAll({
            where:{
                garden: garden,
                organic: organic,
                pets:pets,
                email: {$not: userEmail}
            }
        })
        .then((result)=>{
            return res.json(result);
        })
        
    })
}