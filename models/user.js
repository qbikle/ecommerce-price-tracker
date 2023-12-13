import { Schema, model, models } from "mongoose";
const validator = require("validator");

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
});

const User = models.User || model("User", userSchema);

export default User;
