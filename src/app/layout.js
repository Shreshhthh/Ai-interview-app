import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
// import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
import Footer from "../components/footer";
import Header from "../app/dashboard/_components/Header";
import AuthProvider from "../context/authProvider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "AI-Mock-Interview",
  description: "Online interview mentor",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          {children}
          {/* <Toaster /> */}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

// bg-[#80b0a6]
