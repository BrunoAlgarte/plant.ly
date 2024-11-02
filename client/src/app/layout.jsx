"use client";
import AddPlantModal from "../components/modals/addPlantModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";
import { Poppins } from "next/font/google";
import Header from "../components/header";
import React from "react";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <head>
        <title>Plantinha</title>
        <meta name="description" content="Cuide de sua plantinha" />
      </head>
      <body suppressHydrationWarning={true} className={poppins.className}>
        {pathname !== "/" && <Header />}
        {children}
        <AddPlantModal />
        <ToastContainer />
      </body>
    </html>
  );
}
