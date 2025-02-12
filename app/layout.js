import "./globals.css";
import "./embla.css";
import Navbar from "@/components/navbar/navbar";
import { Poppins } from "next/font/google";
import Footer from "@/components/footer";

export const metadata = {
  title: "PV Advisory",
  description: "PV Advisory",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased relative`}>
        {/* <GlobalBackground /> */}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
