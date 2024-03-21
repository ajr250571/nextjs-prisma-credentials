import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

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
  // console.log(data);
  const result = await prisma.elitex.createMany({
    data: data,
  });

  return NextResponse.json(result);
}
