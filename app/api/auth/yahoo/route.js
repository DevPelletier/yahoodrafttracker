import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const correctDomain = "https://yahoodrafttracker.vercel.app"
const client_id = "dj0yJmk9V0hLeGZhdHUzdXVBJmQ9WVdrOVRsVm9aSEYzY3pRbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWFj"
const redirect_uri = `${correctDomain}/api/auth/yahoo/callback`

console.log(process.env.CLIENT_ID)
console.log(process.env.REDIRECT_URI)

// Handles GET requests to /api
export async function GET(request) {
  console.log('hello?!')
  const baseUrl = `https://api.login.yahoo.com/oauth2/request_auth`;
  console.log(redirect_uri)
  const queryParams = new URLSearchParams({
    client_id: client_id, // process.env.CLIENT_ID,
    redirect_uri: redirect_uri, //process.env.REDIRECT_URI,
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