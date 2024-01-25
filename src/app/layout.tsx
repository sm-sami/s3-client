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
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              color: "white",
            },
          }}
        />
      </body>
    </html>
  );
}
