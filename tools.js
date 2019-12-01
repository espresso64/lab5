const request = require('request');
const mysql = require('mysql');

module.exports = {
/**
 * Return random URLS from an API
 * @param string keyword - search term
 * @param int imageCount - number of random images
 * @return array of image URLs
 * */
 
getRandomImages_cb: function(keyword, imageCount, callback){
         var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=ccd255c7314625281d36782994d48f1115abecd3a673958d123b73bd9f7473b6&orientation=landscape"
  request(requestURL, function (error, response, body) {
  if (!error) {
  var parsedData = JSON.parse(body);
  //console.log ("image url:", parsedData[0]["urls"]["regular"])
  var imageURLs = []
  for (let i = 0; i < 9; i++) {
      imageURLs.push(parsedData[i].urls.regular);   //can use dots instead of square bracket
  }
  //console.log(imageURLs);
  //return imageURLs;
  callback(imageURLs);
  }
  else {
      console.log("error", error)
  }
  
});// end of request
    
    
},

/**
 * Return random URLS from an API
 * @param string keyword - search term
 * @param int imageCount - number of random images
 * @return array of image URLs
 * */
 
getRandomImages: function(keyword, imageCount){
         var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=ccd255c7314625281d36782994d48f1115abecd3a673958d123b73bd9f7473b6&orientation=landscape"
  
  return new Promise(function(resolve, reject){
  request(requestURL, function (error, response, body) {
  if (!error) {
  var parsedData = JSON.parse(body);
  //console.log ("image url:", parsedData[0]["urls"]["regular"])
  var imageURLs = []
  for (let i = 0; i < imageCount; i++) {
      imageURLs.push(parsedData[i].urls.regular);   //can use dots instead of square bracket
  }
  //console.log(imageURLs);
  //return imageURLs;
  resolve(imageURLs);

  }
  else {
      console.log("error", error)
  }
  
});// end of request
    
  }); //end promise
}, //function

/**
 * creates database connection
 * @returns database function
*/
    createConnection: function(){
     var conn = mysql.createConnection({
     host: "cst336db.space",
     user: "cst336_dbUser023",
     password: "rzzjem",
     database: "cst336_db023"
 });    
 return conn;
        
    }

}
