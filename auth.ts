import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "select_account", // <-- This forces the account chooser to show
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // let verifiedTime; // This code for email verification for db value DateTime
      if (!profile?.email) {
        throw new Error("No email found in profile");
      }

      // if (profile.email_verified) { // This code for email verification for db value DateTime
      //   verifiedTime = new Date();
      // }

      const user = await prisma.user.upsert({
        where: { email: profile.email },
        create: {
          email: profile.email,
          name: profile.name,
          emailVerified: profile.email_verified,
        },
        update: { name: profile.name, emailVerified: profile.email_verified },
      });

      return true;
    },
  },
});
