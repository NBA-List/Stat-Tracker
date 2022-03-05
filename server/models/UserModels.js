const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://ianfmadden:Password123@cluster0.urrq0.mongodb.net/Cluster0?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'userData',
    // sets the name of the DB that our collections are part of
  })
    .then(() => console.log('Connected to Mongo DB.'))
    .catch((err) => console.log(err));
  
  const { Schema } = mongoose;
  
  // sets a schema for the 'species' collection
  const userSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    favorited_teams: [String],
    favorited_players: [String],
  });
  
  // creats a model for the 'users' collection that will be part of the export
  module.exports = mongoose.model("user", userSchema)