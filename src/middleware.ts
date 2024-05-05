import {NextResponse, NextRequest} from "next/server";
import {updateSession} from "@/utils/supabase/middleware";
import {cookies} from "next/headers";
import {is} from "@babel/types";

export async function middleware(request: NextRequest) {
    // TODO: For email and password authentication
    // const isAuthenticated = await updateSession(request);
    // if (isAuthenticated.status != 200) {
    //     return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_URL}/sign-in`, request.url));
    // }
    // return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_URL}/`, request.url));

}

export const config = {
    matcher: [],
};
