import User from "../models/User";
import connectDB from "../../lib/connectDB";

export async function POST(request: Request) {
  try {
    await connectDB();
    const url = new URL(request.url);
    const userID = url.searchParams.get("userID");

    if (!userID) {
      return new Response(JSON.stringify({ success: false, error: 'User ID is required' }), { status: 400 });
    }

    const res = await request.json();
    const tasks = res; // Feltételezzük, hogy a request-ben közvetlenül a tasks tömb érkezik

    // Felhasználó keresése
    const user = await User.findById(userID);
    if (!user) {
      return new Response(JSON.stringify({ success: false, error: 'User not found' }), { status: 404 });
    }

    // Felhasználó tasks tömbjének frissítése
    user.tasks = tasks; // Az új tömböt állítjuk be
    await user.save();

    return new Response(JSON.stringify({ success: true, user }), { status: 200 });
  } catch (error) {
    console.error("Error updating tasks:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
