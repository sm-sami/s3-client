import { ListImages, Upload } from "@/components";
import { getImages } from "@/utils/s3-client";

export default async function Home() {
  const images = await getImages();

  return (
    <main className="my-10 flex flex-col gap-10 min-h-screen items-center justify-center">
      <Upload />
      <ListImages images={images} />
    </main>
  );
}
