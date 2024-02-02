import { connect } from "@/database/db";
import User from "@/models/resgister";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connect();
    const user = await User.findOne({ email: email });
    if (user) {
      return NextResponse.json(
        {
          status: 400,
          errors: "Email is already Taken",
        },

        { status: 200 }
      );
    } else {
      await User.create({ name, email, password: hashedPassword });
      return NextResponse.json(
        { status: 201, message: "User Created Successfully" },
        {
          status: 201,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { status: 500, errors: "Error While Login" },
      { status: 200 }
    );
  }
}
