const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://aidenblinn:Goy7rbVkyC7HCzV9@cluster0.ztwql.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "userData",
    // sets the name of the DB that our collections are part of
  })
  .then(() => console.log("Connected to Mongo DB."))
  .catch((err) => console.log(err));

mongoose.set("debug", true);

const { Schema } = mongoose;

// sets a schema for the 'species' collection
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
  favorited_teams: [String],
  favorited_players: [String],
});

// creats a model for the 'users' collection that will be part of the export
module.exports = mongoose.model("user", userSchema);
