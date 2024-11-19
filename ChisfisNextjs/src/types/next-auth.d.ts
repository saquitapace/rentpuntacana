import NextAuth from "next-auth"

declare module "next-auth" {
  interface Profile {
    given_name?: string
    family_name?: string
    sub?: string
  }

  interface User {
    id: string
    user_id: string
    email: string
    first_name: string
    last_name: string
    account_type: string
    avatar?: string
    auth_type: 'credentials' | 'google'
  }

  interface Session {
    user: User
  }
} 