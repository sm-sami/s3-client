"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";

const Upload = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [path, setPath] = useState(
    process.env.NEXT_PUBLIC_AWS_DEFAULT_PATH || ""
  );
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.error("No file selected", {
        icon: "🚫",
        position: "top-right",
        style: {
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          color: "white",
        },
      });
      return;
    }

    if (!name) {
      toast.error("No name is provided", {
        icon: "🚫",
        position: "top-right",
        style: {
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          color: "white",
        },
      });
      return;
    }

    const formData = new FormData();
    formData.append("key", `${path || ""}${name}`);
    formData.append("image", file);

    const res = await fetch(`/api/images`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      toast.success(`Uploaded successfully: ${path}${name}`, {
        icon: "🚀",
        position: "top-right",
        style: {
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          color: "white",
        },
      });
    } else {
      toast.error("Failed to upload", {
        icon: "😔",
        position: "top-right",
        style: {
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          color: "white",
        },
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
