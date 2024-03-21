const { NextResponse } = require("next/server");
import { prisma } from "@/libs/prisma";

export async function POST(request) {
  const { fecha, reloj, fila, telar } = await request.json();

  // "2024-03-16T00:00:00.000Z"
  // const fechaDT = new Date();
  // const fechaStr = fechaDT.toISOString();
  // const fechaOrigen = new Date(fechaStr);
  // console.log(fechaDT);
  // console.log(fechaStr);
  // console.log(fechaOrigen);

  const result = await prisma.elitex.findFirst({
    where: {
      fecha: {
        lt: fecha,
      },
      reloj,
      fila,
      telar,
    },
    orderBy: {
      fecha: "desc",
    },
    select: {
      lec_act: true,
    },
  });

  return NextResponse.json(result);
}
