"use client";
// import { toast, Bounce } from 'react-toastify';
// import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { User2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";

function Header() {
  //   const [user, setUser] = useState<{ nome: string; localAnalista: string } | null>(null);

  //   useEffect(() => {
  //     const nomeAnalista = localStorage.getItem('nomeAnalista');
  //     const localAnalista = localStorage.getItem('localAnalista');

  //     if (nomeAnalista && localAnalista) {
  //       setUser({ nome: nomeAnalista, localAnalista });
  //     } else {
  //       toast.error('Informações de Usuário nao encontradas!', {
  //         position: "bottom-center",
  //         autoClose: 10000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //         transition: Bounce,
  //         });
  //       console.error('Dados do analista não encontrados no armazenamento local.');
  //     }
  //   }, []);

  return (
    <div className="z-5 flex justify-between w-full h-20 fixed bg-[#1e722f] px-2 drop-shadow-3xl mb-2">
      <div
        className="flex items-center gap-2 pl-4 py-2 cursor-pointer"
        onClick={() => {
          window.location.href = "/main";
        }}
      >
        <Image
          src="/img/logo-teste.png"
          width={40}
          height={40}
          alt="logo robotic"
          className="mr-6 md:mr-0 shadow-lg"
        />
        <h2 className="hidden md:block font-bold text-sm lg:text-4xl text-white">
          Plant.ly
        </h2>
      </div>
      <div className="pr-0 py-2 flex gap-x-2 items-center">
        <div className="flex gap-x-2">
          <p className="text-white text-lg">{`Olá, Usuário`}</p>
          <User2Icon size={25} color="#ffffff" />
        </div>
        <Button
          className="w-1/4 h-8 bg-[#ffffff] hover:bg-[#29581f] text-black hover:text-white shadow-md rounded-xl hover:shadow-xl px-8 py-3"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Sair
        </Button>
      </div>
    </div>
  );
}

export default Header;
