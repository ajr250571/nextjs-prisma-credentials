import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function POST(request) {
  try {
    const { fila, telar } = await request.json();
    const data = await prisma.rpm.findFirst({
      where: {
        fila,
        telar,
      },
      select: {
        rpm: true,
      },
    });
    if (!data) {
      return NextResponse.json(
        { message: "Fila y Telar no existe." },
        { status: 500 }
      );
    }
    // console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
