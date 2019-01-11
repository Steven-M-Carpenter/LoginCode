const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isDeleted:  { type: Boolean, default: false }
});


UserSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};


UserSchema.methods.validPassword = (password, storedPW) => {
  return bcrypt.compareSync(password, storedPW);
};


module.exports = mongoose.model("User", UserSchema);
