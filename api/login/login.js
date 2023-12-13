// pages/api/login.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { email, password } = req.body;
    console.log(email, password);
    // Your login logic here
    // Example: Check if email and password are valid
    if (email === "user@example.com" && password === "password") {
      return res
        .status(200)
        .json({ success: true, message: "Login successful" });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
