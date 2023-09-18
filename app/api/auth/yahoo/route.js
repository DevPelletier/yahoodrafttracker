import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Handles GET requests to /api
export async function GET(request) {
  console.log(process.env.REDIRECT_URI);

  const baseUrl = `https://api.login.yahoo.com/oauth2/request_auth`;
  const queryParams = new URLSearchParams({
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI,
    response_type: 'code',
    // scope: '<Required scopes>'
  });

  const thisUrl = `${baseUrl}?${queryParams}`;
  return NextResponse.redirect(thisUrl);
}
// Handles POST requests to /api
export async function POST(request) {
  return NextResponse.json({ message: "Hello POST" });
}