import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

// These are the only routes that require authentication
export const config = { 
  matcher: [
    "/account/:path*",
    "/add-listing/:path*",
    "/favorites/:path*"
  ]
}

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
) 