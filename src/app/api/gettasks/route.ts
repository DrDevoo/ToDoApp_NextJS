import User from "../models/User";
import connectDB from "../../lib/connectDB";

export async function GET(request: Request) {
  try {
    await connectDB();
    const url = new URL(request.url);
    const userID = url.searchParams.get("userID");

    if (!userID) {
      return new Response(JSON.stringify({ success: false, message: 'kell id' }), { status: 400 });
    }

    const user = await User.findById(userID);
    if (!user) {
      return new Response(JSON.stringify({ success: false, message: 'nincs ilyen felhasznalo' }), { status: 404 });
    }

    return new Response(JSON.stringify(user.tasks), { status: 200 });
  } catch (error) {
    console.error("hiba a lekérés során:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
