import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const search =  new URL(request.url).searchParams

    return NextResponse.json({page: search.get("page")})
}