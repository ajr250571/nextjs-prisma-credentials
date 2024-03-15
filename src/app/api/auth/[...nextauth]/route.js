import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials, req) {
        // console.log(credentials);
        const userFound = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        // console.log(userFound);
        if (!userFound) throw new Error("User not found.");
        const mathPassword = await bcrypt.compare(
          credentials.password,
          userFound.password
        );
        if (!mathPassword) throw new Error("Wrong Password.");
        return {
          id: userFound.id,
          name: userFound.username,
          email: userFound.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  // secret: "5/IFQsBlMyvdiZ+BSIOZb8YEWN73FtvbXRfDep10gyk=",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
