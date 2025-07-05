const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes whitespace around the name
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures emails are unique
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum length for password
    },
  },
  { timestamps: true, collection: "Users" }
);

userSchema.statics.registerUser = async function (data) {
  const { email, password, name } = data;

  if (!validator.isEmail(email)) {
    throw new Error("Invalid Email Syntax");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);
  const newUser = await new this({
    name: name,
    email: email,
    password: hashedpassword,
  }).save();
  return newUser;
};

userSchema.statics.loginUser = async function (email, password) {
  const loggedUser = await this.findOne({ email });
  if (!loggedUser) {
    throw new Error("invalid email");
  }
  const passwordCheck = await bcrypt.compare(password, loggedUser.password);
  if (!passwordCheck) {
    throw new Error("invalid password");
  }
  return loggedUser;
};

userSchema.statics.getUser = async function (email) {
  const user = await this.findOne({email});
  return user;
};

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
