"use client"
import { Inter } from "next/font/google";


import { Provider } from "react-redux";
import store from "../Redux/store";
import Navbar from "../../src/app/components/navbar/page";
import "./globals.css"


const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
         <Navbar></Navbar>
          {children}</Provider>
        
      </body>
    </html>
  );
}
