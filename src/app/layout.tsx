import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Upload to S3",
  description: "Client to upload images to S3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
