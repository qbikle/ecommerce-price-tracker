import User from "@/models/user";
import { NextResponse } from "next/server";
import { connectDB } from "@/database/mongodb";
const jwt = require("jsonwebtoken");

connectDB();
// Handle Signup request
export async function POST(request) {
  try {
    const { name, username, email, password } = await request.json();

    // Check if user exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const newUser = new User({ name, username, email, password });
    await newUser.save();
    const userData = await User.findByCredentials(email, password);
    const tokenData = {
      id: userData._id,
      username: userData.username,
      email: userData.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "7 days",
    });

    const response = NextResponse.json({
      message: "Signup successful",
      success: true,
    });

    response.cookies.set("token", token, {
      sameSite: "none",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
