import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// {
//     "fecha":"2024-03-16T00:00:00.000Z",
//     "turno":1,
//     "fila":1,
//     "telar":1,
//     "lec_act":25,
//     "lec_ant":13,
//     "hrs":8,
//     "rpm":350,
//     "rend":80.0,
//     "reloj":1
//   }

export async function POST(request) {
  const data = await request.json();
  const session = await getServerSession(authOptions);

  const result = await prisma.elitex.create({
    data: {
      fecha: data.fecha,
      turno: data.turno,
      fila: data.fila,
      telar: data.telar,
      lec_act: data.lec_act,
      lec_ant: data.lec_ant,
      hrs: data.hrs,
      rpm: data.rpm,
      rend: data.rend,
      reloj: data.reloj,
      userEmail: session.user.email,
    },
  });

  return NextResponse.json(result);
}
