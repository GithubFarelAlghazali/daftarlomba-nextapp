import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./middlewares/withAuths";

function mainMiddleware(req: NextRequest) {
     const res = NextResponse.next();
     return res;
}

export default withAuth(mainMiddleware, ["/dashboard"]);
