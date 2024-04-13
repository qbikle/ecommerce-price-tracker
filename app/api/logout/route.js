import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({ success: true });
    response.cookies.set("token", "", { maxAge: 0 });
    return response;
  } catch (error) {
    NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
