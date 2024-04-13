import User from "@/models/user";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

// Handle Login request
export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const user = await User.findByCredentials(email, password);
    // Create Auth token for user
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "7 days",
    });
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, {
      sameSite: "none",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false });
  }
}
