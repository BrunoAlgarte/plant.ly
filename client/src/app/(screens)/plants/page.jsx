"use client";

import AddPlantModal from "../../../components/modals/addPlantModal";
import { LeafIcon, Trash2Icon } from "lucide-react";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import { useState } from "react";
import Image from "next/image";
import React from "react";

export default function Plants() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="flex flex-col justify-between h-screen">
        <Header />
        <div className="pt-4 h-full w-screen bg-[rgb(221,220,220)] bg-cover">
          {/* Conteúdo Plants */}
          <div className="px-2 mt-16 py-2">
            {/* Header Dash */}
            <div className="flex gap-2 py-2 justify-between items-center">
              <h1 className="pl-2 text-4xl text-[#1e722f] font-semibold">
                Minhas plantas
              </h1>
              <button
                className="bg-[#1e722f] text-white rounded-3xl px-5 py-3 flex gap-x-1 items-center border-2 border-[#1e722f] hover:border-gray-400"
                onClick={openModal}
              >
                Adicionar
                <LeafIcon size={30} color="#ffffff" />
                <AddPlantModal isOpen={isModalOpen} onClose={closeModal} />
              </button>
            </div>
            <div className="flex flex-col p-2 gap-y-3">
              {/* Card de planta */}
              <div className="p-3 flex w-full bg-gray-200 rounded-2xl border-2 border-gray-400 hover:border-[#1e722f] items-center justify-between shadow-lg">
                <div className="flex gap-x-3 items-center">
                  <Image
                    src="/img/plante_04.jpg"
                    width={150}
                    height={150}
                    alt="Planta"
                    className="h-full mr-2 border-2 border-[#1e722f] rounded-full min-h-[100px] max-h-[100px] min-w-[100px] max-w-[100px]"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-[#1e722f] text-2xl font-bold mb-2">
                      Cebolinha
                    </h1>
                    <div className="flex gap-x-1 text-sm">
                      <p>Adicionado em: </p>
                      <p>10/10/2024</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-x-2">
                  <button
                    className="bg-[#1e722f] text-white rounded-3xl px-5 py-3"
                    onClick={() => {
                      window.location.href = "/dashboard";
                    }}
                  >
                    Ver
                  </button>
                  <button className="bg-[#1e722f] text-white rounded-3xl p-3">
                    <Trash2Icon size={25} color="#ffffff" />
                  </button>
                </div>
              </div>
              {/* Card de planta */}
              <div className="p-3 flex w-full bg-gray-200 rounded-2xl border-2 border-gray-400 hover:border-[#1e722f] items-center justify-between shadow-lg">
                <div className="flex gap-x-3 items-center">
                  <Image
                    src="/img/plante_03.jpg"
                    width={150}
                    height={150}
                    alt="Planta"
                    className="h-full mr-2 border-2 border-[#1e722f] rounded-full min-h-[100px] max-h-[100px] min-w-[100px] max-w-[100px]"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-[#1e722f] text-2xl font-bold mb-2">
                      Manjericão
                    </h1>
                    <div className="flex gap-x-1 text-sm">
                      <p>Adicionado em: </p>
                      <p>10/10/2024</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-x-2">
                  <button
                    className="bg-[#1e722f] text-white rounded-3xl px-5 py-3"
                    onClick={() => {
                      window.location.href = "/dashboard";
                    }}
                  >
                    Ver
                  </button>
                  <button className="bg-[#1e722f] text-white rounded-3xl p-3">
                    <Trash2Icon size={25} color="#ffffff" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
