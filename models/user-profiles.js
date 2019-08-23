var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");
var userProfiles = sequelize.define("userProfiles", {
  userEmail: Sequelize.STRING,
  userName: Sequelize.STRING,
  hasgarden: Sequelize.BOOLEAN,
  summary: Sequelize.STRING

}, {
  freezeTableName: true
});
userProfiles.sync();
