const { getDataFromToken } = require("@/helper/getDataFromToken");
const User = require("@/models/user");
const { connectDB } = require("@/database/mongodb");

connectDB();

export async function GET(request) {
  try {
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ message: "Not Authorized", success: false });
    }
    const user = User.findById({ _id: userId }).select("-password");
    if (!user) {
      return NextResponse.json({ message: "Not Authorized", success: false });
    }
    return NextResponse.json({ user, success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
