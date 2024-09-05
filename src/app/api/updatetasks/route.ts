import User from "../models/User";
import connectDB from "../../lib/connectDB";

export async function POST(request: Request) {
  try {
    await connectDB();
    const url = new URL(request.url);
    const userID = url.searchParams.get("userID");

    if (!userID) {
      return new Response(JSON.stringify({ success: false, error: 'userid' }), { status: 400 });
    }

    const res = await request.json();
    const tasks = res; 

    const user = await User.findById(userID);
    if (!user) {
      return new Response(JSON.stringify({ success: false, error: 'nincs ilyen felhasznalo' }), { status: 404 });
    }
    user.tasks = tasks;
    await user.save();

    return new Response(JSON.stringify({ success: true, user }), { status: 200 });
  } catch (error) {
    console.error("hiba:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
