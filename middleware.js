import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublic = path.startsWith("/signup") || path.startsWith("/login");
  const isPrivate = path.startsWith("/profile") || path.startsWith("/products");

  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      if (isPrivate) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
      }
      return;
    }
    const res = await fetch("http://localhost:3000/api/info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookies: token,
      },
      cookies: token,
    });
    const data = await res.json();
    if (data.message === "User Found" && isPublic) {
      return NextResponse.redirect(new URL("/products", request.nextUrl));
    }
    if (data.message !== "User Found" && isPrivate) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile", "/products", "/login", "/signup"],
};
