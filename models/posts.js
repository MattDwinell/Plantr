var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");
var posts = sequelize.define('posts',{
    user: Sequelize.STRING,
    message: Sequelize.TEXT,
    title: Sequelize.STRING
},
{freezeTableName: false});
posts.sync().then(
    posts.create({
        user: 'admin',
        message: 'welcome to plantr public posts! we hope you enjoy your visit here. grow with us!',
        title: 'welcome'
    })
);
module.exports = posts;