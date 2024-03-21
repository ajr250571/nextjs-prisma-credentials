const prisma = require("@prisma/client");

// node seeder.js

async function main() {
  const prismaClient = new prisma.PrismaClient();

  for (let fila = 1; fila <= 6; fila++) {
    var rpm = 0;
    if (fila <= 2) {
      rpm = 390;
    } else {
      rpm = 235;
    }
    for (let telar = 1; telar <= 22; telar++) {
      // await prismaClient.rpm.create({
      //   data: {
      //     fila,
      //     telar,
      //     rpm, // Generar RPM aleatorio
      //   },
      // });
      await prismaClient.elitex.createMany({
        data: [
          {
            fecha: "2024-03-02T00:00:00.000Z",
            turno: 1,
            fila: fila,
            telar: telar,
            lec_act: 10,
            lec_ant: 1,
            hrs: 8,
            rpm: rpm,
            rend: 0,
            reloj: 1,
          },
          {
            fecha: "2024-03-02T00:00:00.000Z",
            turno: 2,
            fila: fila,
            telar: telar,
            lec_act: 10,
            lec_ant: 1,
            hrs: 8,
            rpm: rpm,
            rend: 0,
            reloj: 2,
          },
          {
            fecha: "2024-03-02T00:00:00.000Z",
            turno: 3,
            fila: fila,
            telar: telar,
            lec_act: 10,
            lec_ant: 1,
            hrs: 8,
            rpm: rpm,
            rend: 0,
            reloj: 3,
          },
        ],
      });
    }
  }
  await prismaClient.$disconnect();
}

main().catch((e) => console.error(e));
