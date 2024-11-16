import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"
import { createUser, getUserByEmail } from "@/lib/db"
import bcrypt from "bcryptjs"
import { User } from "@/types/user"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile"
        }
      }
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password')
        }

        const user = await getUserByEmail(credentials.email)
        if (!user) {
          throw new Error('No user found with this email')
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          throw new Error('Invalid password')
        }

        return {
          id: user.user_id,
          user_id: user.user_id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          account_type: user.account_type,
          auth_type: 'credentials'
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === "google") {
          if (!user?.email) {
            console.error("No email provided by Google");
            return false;
          }

          const existingUser = await getUserByEmail(user.email)
          
          if (!existingUser) {
            console.log("Creating new user from Google sign in");
            const result = await createUser({
              account_type: 'renter',
              first_name: profile.given_name || user.name?.split(' ')[0] || '',
              last_name: profile.family_name || user.name?.split(' ')[1] || '',
              email: user.email,
              avatar: user.image || '/images/avatars/default.png',
              google_id: profile.sub,
              auth_type: 'google'
            })

            user.id = result.userId;
            user.user_id = result.userId;
            user.first_name = result.first_name;
            user.last_name = result.last_name;
            user.account_type = result.account_type;
            user.avatar = result.avatar;
            user.auth_type = 'google';
          } else {
            console.log("Existing user found:", existingUser);
            user.id = existingUser.user_id;
            user.user_id = existingUser.user_id;
            user.first_name = existingUser.first_name;
            user.last_name = existingUser.last_name;
            user.account_type = existingUser.account_type;
            user.avatar = existingUser.avatar || '/images/avatars/default.png';
            user.auth_type = 'google';
          }
          return true;
        }
        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.user) {
        const sessionUser = session.user as User;
        return { ...token, user: sessionUser };
      }
      
      if (user) {
        token.user = user as User;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        const tokenUser = token.user as User;
        const dbUser = await getUserByEmail(tokenUser.email);
        session.user = {
          ...tokenUser,
          avatar: dbUser?.avatar || tokenUser.avatar || '/images/avatars/default.png',
          auth_type: tokenUser.auth_type as "credentials" | "google"
        };
      }
      return session;
    }
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }