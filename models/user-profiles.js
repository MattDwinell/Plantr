var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");
var userProfiles = sequelize.define("userProfiles", {
    email: Sequelize.STRING,
    contactEmail: Sequelize.STRING,
    userName: Sequelize.STRING,
    address: Sequelize.STRING,
    imageUrl: Sequelize.STRING,
    summary: Sequelize.TEXT,
    plants: Sequelize.STRING,
    hasGarden: Sequelize.BOOLEAN,
    needsGarden: Sequelize.BOOLEAN,
    organic: Sequelize.BOOLEAN,
    pets: Sequelize.BOOLEAN,
    age: Sequelize.INTEGER,
    hours: Sequelize.REAL,
    avatar: Sequelize.STRING

}, {
  freezeTableName: false
});
userProfiles.sync().then(
    userProfiles.create({
        email: 'testing@gmail.com',
        contactEmail: 'contactEmail@hotmail.com',
        userName: 'userName',
        address: 'address',
        imageUrl: 'imageUrl',
        summary: 'summary goes here',
        plants: 'carrots and stuff',
        hasGarden: true,
        needsGarden: false,
        organic: true,
        pets: false,
        age: 20,
        hours: 5,
        avatar: "rake"
    })
);
module.exports = userProfiles;