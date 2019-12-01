const express = require("express");
const app = express();
app.use(express.static("public")); //added



app.set('view engine', 'ejs');
const request = require("request");
const mysql = require("mysql");
const tools = require("./tools.js");

//routes

//root route
app.get("/", async function(req, res){
 var imageURLs = await tools.getRandomImages("", 1);
      //console.log("Using promises " + imageURLs);
      res.render("index", {"imageURLs":imageURLs})

});//root route


app.get("/search", async function (req, res){
    //console.dir(req);
    //console.log(req.query.keyword);
      var keyword = req.query.keyword;

      var imageURLs = await tools.getRandomImages(keyword, 9);
      console.log("Using promises " + imageURLs);
      res.render("results", {"imageURLs":imageURLs, "keyword":keyword})
      
      
    //   getRandomImages_cb(keyword, 9, function(imageURLs) {
    //   console.log("imageURLs: " + imageURLs);
    //   res.render("results", {"imageURLs":imageURLs})
          
          
    //   })

});//search


app.get("/api/updateFavorites", function (req, res) {
 
    var conn = tools.createConnection();
    var sql;
    var sqlParams;
    
    if (req.query.action == "add"){
    sql = "INSERT INTO favorites (imageURL, keyword) VALUES (?, ? )"
    sqlParams = [req.query.imageURL, req.query.keyword];
    }
    else {
    sql = "DELETE FROM favorites WHERE imageURL = ?";
    sqlParams = [req.query.imageURL];
        
    }
    
    conn.connect (function (err){
    
    if (err) throw err;
    
    conn.query(sql, sqlParams, function(err, results){
        
        
        
    });//query
       if (err) throw err; 
        
        
    })//conect
    
    res.send("it works");
    
}); //updateFavorites

app.get("/displayKeywords", async function (req,res){
 var imageURLs = await tools.getRandomImages("", 1);
 var conn = tools.createConnection();
 var sql = "SELECT DISTINCT keyword FROM cst336_db023.favorites ORDER BY keyword";
 
 conn.connect(function(err){
  
  if(err) throw err;
  conn.query(sql, function(err,results){
   if (err) throw err;
   res.render("favorites", {"rows":results, "imageURLs":imageURLs});
  console.log(results)
});// query
  
});// connect

});//displayKeywords



app.get("/api/displayFavorites", function(req,res){
  var conn = tools.createConnection();
  var sql = "SELECT imageURL FROM favorites WHERE keyword = ?";
  var sqlParams = [req.query.keyword];
 
  conn.connect(function(err){
  
  if(err) throw err;
  conn.query(sql, sqlParams, function(err,results){
   if (err) throw err;
   res.send(results);
});// query
  
});// connect
 
});//displayFavorites

//server listener
app.listen("8080", "0.0.0.0", function(){  //8081 used in example
 console.log("Express server is running")
})
