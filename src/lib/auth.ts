/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const response = await res.json();
        console.log("Backend login response:", response);

        // ✅ FIX 1: Check status instead of success
        if (!res.ok || !response?.status) {
          throw new Error(response?.message || "Login failed");
        }

        const user = response?.data?.user;
        const accessToken = response?.data?.accessToken;

        if (!user || !accessToken) {
          throw new Error("Invalid login response structure");
        }

        // ❗ তোমার API তে role হচ্ছে "USER"
        // আগের condition ছিল admin check — সেটা remove করলাম
        // যদি দরকার হয় আলাদা করে করতে পারো

        return {
          id: user._id,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage || null,
          accessToken,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.profileImage = user.profileImage;
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: JWT }) {
      session.user = {
        id: token.id,
        email: token.email,
        role: token.role,
        profileImage: token.profileImage,
        accessToken: token.accessToken,
      };
      return session;
    },
  },
};