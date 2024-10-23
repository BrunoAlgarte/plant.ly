"use client";
import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <div className="z-5 flex justify-center w-full bg-[#1e722f] px-2 drop-shadow-3xl">
      <div className="pr-0 py-2 flex gap-x-2 items-end">
        <div className="flex flex-col gap-y-1 text-center py-1">
          <p className="text-white text-xs">
            Projeto Interdisciplinar do 4º Semestre
          </p>
          <p className="text-white text-xs">
            FATEC - Franca | Desenvolvimento de Software Multiplataforma
          </p>
          <p className="text-white text-xs">Desenvolvido por Bruno Algarte, Eduardo Vilas Boas e Rafael Verissimo</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
