import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

const roleBasedRoutes: Record<string, string[]> = {
     admin: ["/dashboard"],
     participant: ["/dashboard/participant"],
     juri: ["/dashboard/juri"],
};

export default function withAuth(middleware: NextMiddleware) {
     return async (req: NextRequest, next: NextFetchEvent) => {
          const { pathname } = req.nextUrl;

          // cek apakah ini halaman dashboard
          const isDashboard = pathname.startsWith("/dashboard");

          if (isDashboard) {
               const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

               // redirect ke /login jika belum login
               if (!token) {
                    const loginUrl = new URL("/login", req.url);
                    loginUrl.searchParams.set("callbackUrl", req.url);
                    return NextResponse.redirect(loginUrl);
               }

               // validasi role terhadapa route yang sesuai
               const role = token.role as string;
               const allowedRoutes = roleBasedRoutes[role] || [];

               const isAllowed = allowedRoutes.some((route) => pathname.startsWith(route));
               if (!isAllowed) {
                    return NextResponse.redirect(new URL("/", req.url));
               }
          }

          return middleware(req, next);
     };
}
