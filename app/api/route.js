import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request) {
    const code = request.nextUrl.searchParams.get('code')
    
    return NextResponse.json({code: code});
}

// Handles POST requests to /api
export async function POST(request) {
    return NextResponse.json({ message: "Hello POST" });
}