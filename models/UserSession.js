const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSessionSchema = new Schema({
  userId: { type: String, default: -1 },
  timestamp: { type: Date, default: Date.now() },
  isDeleted:  { type: Boolean, default: false }
});


module.exports = mongoose.model("UserSession", UserSessionSchema);

