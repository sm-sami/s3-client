import { NextRequest, NextResponse } from "next/server";
import { createPreSignedUrl } from "@/utils/s3-client";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const key = searchParams.get("key");
  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }

  const url = await createPreSignedUrl(key);
  return NextResponse.json({ url }, { status: 200 });
}
