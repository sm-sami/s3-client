"use client";

import { ImageType } from "@/utils/schema";
import { CopyIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";

const ListElement = ({ Key, LastModified, Size }: ImageType) => {
  return (
    <div className="grid grid-cols-6 gap-5">
      <div className="flex justify-between items-center col-span-3 px-4 py-2.5 bg-white/5 rounded-lg">
        {Key}
        <button
          className="bg-white/5 p-2 rounded-md"
          onClick={() => {
            const url = process.env.NEXT_PUBLIC_AWS_URL
              ? `${process.env.NEXT_PUBLIC_AWS_URL}/${Key}`
              : Key;
            navigator.clipboard.writeText(url).then(() =>
              toast("Copied to clipboard", {
                icon: "📋",
              })
            );
          }}
        >
          <CopyIcon className="bg-transparent cursor-pointer active:scale-125 transition-all duration-75 ease-in-out" />
        </button>
      </div>
      <div className="flex items-center col-span-2 px-4 py-2.5 bg-white/5 rounded-lg">
        {new Date(LastModified).toDateString()}
      </div>
      <div className="flex items-center px-4 py-2.5 bg-white/5 rounded-lg">
        {Size}
      </div>
    </div>
  );
};

const ListImages = ({ images }: { images: Array<ImageType> }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-6 gap-5">
        <div className="col-span-3 px-4 py-2.5 bg-white/5 rounded-lg">Key</div>
        <div className="col-span-2 px-4 py-2.5 bg-white/5 rounded-lg">
          Last Modified
        </div>
        <div className="px-4 py-2.5 bg-white/5 rounded-lg">Size (KB)</div>
      </div>
      <>
        {images.map((image) => (
          <ListElement key={image.Key} {...image} />
        ))}
      </>
    </div>
  );
};

export default ListImages;
