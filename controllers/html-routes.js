var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {


  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/html/login.html"));
  });

  // Route to the cms page
  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/html/login.html"));
  });
  app.get("/profile", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/html/profile.html"));
  });
  app.get("/open-posts", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/html/open-posts.html"));
  });
  app.get("/search", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/html/search.html"));
  });
  app.get("/about", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/html/about.html"));
  });
  

//   app.get("/assets/html/maker", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/assets/html/maker.html"));
//   });

};
