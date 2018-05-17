var mongoose = require("mongoose");
mongoose.connect( "mongodb://localhost/tp"
                  // "mongodb+srv://admin:password@cluster0-lrn3m.mongodb.net/test"
, function(err, db) {
      if (err) throw err;
      console.log("BD creada!");
     // db.close();
});

module.exports.mongoose = mongoose;