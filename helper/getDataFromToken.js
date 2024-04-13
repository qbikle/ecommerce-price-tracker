import { NextRequest } from "next/server";
const jwt = require("jsonwebtoken");

export const getDataFromToken = async (request) => {
  const token = request.headers.get("cookies");
  if (!token) {
    return null;
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.id;
  return userId;
};
