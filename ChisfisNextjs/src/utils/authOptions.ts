
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from '@/app/api/auth/user/get/route';
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID!,
        clientSecret: process.env.GOOGLE_SECRET!,
      }),
      CredentialsProvider({
        name: "credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials");
          }
  
          const user = await getUserByEmail(credentials.email);
          
          if (!user) {
            throw new Error("No user found with this email");
          }
  
          if (user.auth_type === 'google') {
            throw new Error("Please sign in with Google");
          }
  
          if (!user.password) {
            throw new Error("Invalid login method");
          }
  
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
  
          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }
  
          return {
            id: user.userId,
            userId: user.userId,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            accountType: user.accountType,
            avatar: user.avatar || '/images/avatars/default.png',
            auth_type: user.auth_type
          };
        }
      })
    ],
    pages: {
      signIn: '/login',
      error: '/login',
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.user = user;
        }
        return token;
      },
      async session({ session, token }) {
        session = token as any;
        return session;
      }
    },
    session: {
      strategy: "jwt"
    },
    /* jwt: {
      secret: process.env.JWT_SECRET
    }, */
    debug: process.env.NODE_ENV === 'development',
  };