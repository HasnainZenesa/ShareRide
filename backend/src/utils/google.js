import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(); // public verify only

export async function verifyGoogleIdToken(idToken){
  // Aud validation optionally: provide client IDs to audience array
  const ticket = await client.verifyIdToken({ idToken, audience: undefined });
  const payload = ticket.getPayload();
  // payload contains: email, sub (google user id), email_verified, name, picture
  return payload;
}
