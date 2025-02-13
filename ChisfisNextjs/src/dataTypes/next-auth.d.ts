import NextAuth from "next-auth"

declare module "next-auth" {
  interface Profile {
    given_name?: string
    family_name?: string
    sub?: string
  }

  interface User {
    id: string
    userId: string
    email: string
    firstName: string
    lastName: string
    accountType: string
    avatar: string
    auth_type: 'credentials' | 'google'
    companyName: string
    fullName: string
    displayName: string
    location: string
    phoneNumber: string
    about: string
    languages: string[]
    socials: string[]
    createdAt: string
    isLoading: boolean
    error: string | null
  }

  interface Session {
    user: User
  }
} 