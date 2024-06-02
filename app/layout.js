import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./provider/providers";
import "@rainbow-me/rainbowkit/styles.css";
import UploadFilePage from "./tokenupload/tokenupload";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Zreeled",
  description: "product by Zreeled",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>{children}</Providers>
        <UploadFilePage></UploadFilePage>
        </body>
    </html>
  );
}
