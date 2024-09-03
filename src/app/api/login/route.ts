import User from "../models/User";
import connectDB from "../../lib/connectDB";
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    await connectDB();

    const { username, password } = await request.json();

    const user = await User.findOne({ username });
    if (!user) {
      return new Response(JSON.stringify({ done: false, message: 'Nem megfelelő felhasználónév vagy jelszó' }), { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ done: false, message: 'Nem megfelelő felhasználónév vagy jelszó' }), { status: 400 });
    }

    return new Response(JSON.stringify({ done: true, username: user.username }), { status: 200 });

  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response(JSON.stringify({ done: false, error: error.message }), { status: 500 });
  }
}
