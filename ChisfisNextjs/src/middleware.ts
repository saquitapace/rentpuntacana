import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

// These are the only routes that require authentication
export const config = { 
  matcher: [
    "/author",
    "/account/:path*",
    "/add-listing/:path*",
    "/favorites/:path*"
  ]
}

/* export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
) */ 

export default withAuth(
  async (req) => {
    const token = req.nextauth.token;

    if (!token) {
      const url = new URL("/login", req.url);
      url.searchParams.set("callbackUrl", req.url); // Add a callback URL to redirect back after login
      return NextResponse.redirect(url);
    }
    
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login", // Fallback sign-in page if necessary
    },
  }
);