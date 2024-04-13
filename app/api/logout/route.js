import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Logging out");
    const response = NextResponse.json({ success: true });
    response.cookies.delete("token");
    return response;
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
