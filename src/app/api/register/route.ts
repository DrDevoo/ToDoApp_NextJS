import User from "../models/User";
import connectDB from "../../lib/connectDB";
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    await connectDB();

    const res = await request.json();
    const { username, password } = res;

    if (!username || !password) {
      return new Response(JSON.stringify({ done: false, message: 'Username and password are required' }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const person = new User({
      username,
      password: hashedPassword
    });

    await person.save();

    return new Response(JSON.stringify({ done: true }), { status: 200 });

  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response(JSON.stringify({ done: false, error: error.message }), { status: 500 });
  }
}
