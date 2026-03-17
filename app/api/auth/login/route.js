import { users } from "@/lib/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const user = users.find(u => u.email === email);

    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return Response.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return Response.json({
      message: "Login successful",
      token
    });

  } catch (err) {
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}