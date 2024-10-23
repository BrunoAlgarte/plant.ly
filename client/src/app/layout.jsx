'use client';

import React, { useState } from "react";
import { Poppins } from "next/font/google";
import AddPlantModal from "../components/modals/addPlantModal";
import useAddPlantModal from "../utils/hooks/useAddPlantModal";
import "./globals.css";

// Configurando a fonte Poppins
const poppins = Poppins({ subsets: ["latin"], weight: ['500'] });

// Componente de layout
export default function ClientLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {setIsOpen(true)};
  const handleClose = () => {setIsOpen(false)};

  return (
    <html lang="en">
      <head>
        <title>Plantinha</title>
        <meta name="description" content="Cuide de sua plantinha" />
      </head>
      <body suppressHydrationWarning={true} className={poppins.className}>
        {children}
        <AddPlantModal isOpen={isOpen} onClose={handleClose} />
      </body>
    </html>
  );
}
