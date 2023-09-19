import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request) {
    if (request.cookies.has('yAccessToken')) {
        const cookie = request.cookies.get('yAccessToken')
        return NextResponse.json({cookie});
    } else {
        return new NextResponse.json({msg:'no access token cookie :('});
    }
}

export async function POST(request) {
  return NextResponse.json({ message: "Hello POST" });
}  