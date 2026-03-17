import bcrypt from "bcryptjs";

// TEMP in-memory users (later replace with DB)
import { users } from "@/lib/users";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // check if user exists
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      return Response.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
      role: "user"
    };

    users.push(newUser);

    return Response.json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (err) {
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}