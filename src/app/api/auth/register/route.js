import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const data = await request.json();

    const emailFound = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (emailFound) {
      return NextResponse.json(
        {
          message: "Email already exists.",
        },
        { status: 400 }
      );
    }
    const usernameFound = await prisma.user.findUnique({
      where: { username: data.username },
    });
    if (usernameFound) {
      return NextResponse.json(
        {
          message: "Username already exists.",
        },
        { status: 400 }
      );
    }
    const hashPassword = await bcrypt.hash(data.password, 10);
    const userNew = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashPassword,
      },
    });
    const { password: _, ...user } = userNew;
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
