import { getImages, uploadImage } from "@/utils/s3-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const images = await getImages();

  return NextResponse.json(images, { status: 200 });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const image = await (formData.get("image") as Blob).arrayBuffer();
  const key = formData.get("key") as string;
  const res = await uploadImage(key, image);

  if (res === 200) {
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } else {
    return NextResponse.json(null, { status: 200 });
  }
}
