import { NextResponse } from "next/server";


// Handles GET requests to /api
export async function GET(request) {
  // const auth_code = searchParams.get('code')
  let auth_code = 'test'
  console.log(request)

  return NextResponse.json({ message: `Auth Code: ${auth_code}` });
}

export async function POST(request) {
  return NextResponse.json({ message: "Hello POST" });
}