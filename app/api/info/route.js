import { NextRequest, NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
import User from "@/models/user";
import { connectDB } from "@/database/mongodb";

connectDB();

export async function POST(request) {
  const token = request.headers.get("cookies");
  if (!token) {
    return NextResponse.json({ message: "Not Login Found" }, { status: 401 });
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.id;
  const user = await User.findById(userId);
  if (!user) {
    return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
  }
  return NextResponse.json({ message: "User Found" }, { status: 200 });
}
