import { ListImages, Upload } from "@/components";

const getImages = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/images`);
  return await res.json();
};

export default async function Home() {
  const images = await getImages();

  return (
    <main className="mt-10 flex flex-col gap-10 min-h-screen items-center justify-center">
      <Upload />
      <ListImages images={images} />
    </main>
  );
}
