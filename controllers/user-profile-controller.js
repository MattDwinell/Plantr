var userProfiles = require("../models/user-profiles.js");
var posts = require("../models/posts.js");
const Sequelize = require('sequelize');
module.exports = function (app) {
    app.get("/api/posts", (req,res)=>{
        posts.findAll()
        .then((result)=>{
            return res.json(result);
        })
    })
    app.post("/api/posts", (req,res)=>{
        const {title, message, user} = req.body;
        posts.create({
            user: user,
            message: message,
            title: title
        })
        .then((result)=>{
            return res.json(result);
        })
    })


    app.get("/api/user-profiles/:user", (req, res) => {
        const { user } = req.params;
        userProfiles.findAll({
            where: {
                email: user
            }
        }).then((result) => {
            return res.json(result);
        })
    })
    app.get("/api/user-ids/:id", (req, res) => {
        const { id } = req.params;
        userProfiles.findAll({
            where: {
                id: id
            }
        }).then((result) => {
            return res.json(result);
        })
    })

    app.post("/api/new-user", (req, res) => {
        const { email, userName, address, contactEmail, imageUrl, summary, plants, hasGarden, needsGarden, organic, pets, age, hours, avatar } = req.body;
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
            .then((result) => {
                return res.json(result);
            })
    })

    app.put("/api/update-user/:id", (req, res) => {
        userProfiles.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then((success) => {
           return res.json(success);

        })
    })

    app.get('/api/search/:userEmail/:distance/:garden/:organic/:pets', (req, res) => {
        let { userEmail, distance, garden, organic, pets } = req.params;
        if (garden == 'true') {
            garden = true;
        } else {
            garden = false;
        }
        if (organic == 'true') {
            organic = true;
        } else {
            organic = false;
        }
        if (pets == 'true') {
            pets = true;
        } else {
            pets = false;
        }
        console.log(userEmail, distance);
        userProfiles.findAll({
            where: {
                organic: organic,
                pets: pets,
                email: { [Sequelize.Op.not]: userEmail }
            }
        })
            .then((result) => {
                return res.json(result);
            })

    })
}