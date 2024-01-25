"use client";

import { FormEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

const Upload = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [path, setPath] = useState(
    process.env.NEXT_PUBLIC_AWS_DEFAULT_PATH || ""
  );
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.error("No file selected", {
        icon: "🚫",
      });
      return;
    }

    if (!name) {
      toast.error("No name is provided", {
        icon: "🚫",
      });
      return;
    }

    const postUrlRes = await fetch(`/api/presigned-url?key=${path}${name}`);

    if (!postUrlRes.ok) {
      toast.error("Failed to get presigned url", {
        icon: "😔",
      });
      return;
    }

    const { url } = await postUrlRes.json();
    const res = await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (res.ok) {
      toast.success(`Uploaded successfully: ${path}${name}`, {
        icon: "🚀",
      });
    } else {
      toast.error("Failed to upload", {
        icon: "😔",
      });
    }

    setName("");
    fileRef.current?.value && (fileRef.current.value = "");
    setFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
    setName(e.target.files[0].name);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleUpload}>
      <input
        type="file"
        ref={fileRef}
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
        className="flex px-3 py-2 bg-white/5 rounded-lg file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white"
      />
      <div className="flex gap-2">
        <input
          className="px-5 py-2 bg-white/5 rounded-lg"
          type="text"
          value={path}
          placeholder="path"
          onChange={(e) => setPath(e.target.value)}
        />
        <input
          className="px-5 py-2 bg-white/5 rounded-lg"
          type="text"
          value={name}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <div className="px-5 py-2 bg-white/5 rounded-lg flex-grow">
          Key:{" "}
          <span className="font-bold">
            {path}
            {name}
          </span>
        </div>
        <button
          type="submit"
          className="px-5 py-2 bg-white/5 w-fit rounded-lg font-medium self-end"
        >
          Upload
        </button>
      </div>
    </form>
  );
};

export default Upload;
