import {NextResponse, NextRequest} from "next/server";

export async function middleware(request: NextRequest) {

    // TODO: get the cookie and re-direct based on the right route
    return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_URL}/sign-in`, request.url));
}

export const config = {
    matcher: ["/"],
};
