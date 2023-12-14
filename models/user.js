import { Schema, model, models } from "mongoose";
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    minlength: [3, "Username should be at least 3 characters long"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: (props) => {
        return `${props.value} is not a valid email address`;
      },
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password should be at least 6 characters long"],
    trim: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  // Hash the password only if it has been modified (or is new)
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Find user by email and password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("No User found with this email, Please Sign Up!");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Wrong Password");
  return user;
};

const User = models.User || model("User", userSchema);

export default User;
