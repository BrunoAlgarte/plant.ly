"use client";
import AddPlantModal from "../../../components/modals/addPlantModal";
import useUserId from "../../../utils/hooks/useUserId";
import React, { useState, useEffect } from "react";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import { CircleLoader } from "react-spinners";
import { Clock10Icon } from "lucide-react";
import api from "../../../utils/api";
import Image from "next/image";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState("");
  const [loading, setLoading] = useState(true);
  const [plants, setPlants] = useState([]);
  const { user_id } = useUserId();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    fetchPlants();
  };

  const fetchPlants = async () => {
    try {
      if (!user_id) {
        setLoading(false);
        return;
      }

      const { data } = await api.get(`/v1/plants/user/${user_id}`);
      setPlants(data.plants);
    } catch (error) {
      console.error("Erro ao buscar plantas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user_id) {
      fetchPlants();
    }
  }, [user_id]);

  return (
    <>
      <Header />
      <AddPlantModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        userId={user_id} 
        onPlantAdded={fetchPlants} 
        zIndex={9999} 
      />
      <div className="pt-4 mb-2 h-full w-full bg-[rgb(221,220,220)] bg-cover">
        {/* Barra de plantas */}
        <div className="py-3 mt-16">
          <div className="flex gap-x-2 px-2">
            {loading ? (
              <div className="flex justify-center items-center w-full py-10">
                <CircleLoader color="#1e722f" size={50} />
              </div>
            ) : (
              <>
                {plants.map((plant) => (
                  <div 
                    key={plant.id}
                    className="flex flex-col items-center justify-center bg-white pb-1 rounded-xl border-2 border-spacing-5 border-gray-400 hover:border-[#1e722f] min-h-[199px] max-h-[199px] min-w-[145.5px] max-w-[145.5px] cursor-pointer"
                    onClick={() => setSelectedPlant(plant.name)}
                  >
                    <Image
                      src={plant.image || "/img/floresta.jpg"}
                      width={150}
                      height={150}
                      alt={plant.name}
                      className="mx-auto h-full mt-0.5 rounded-t-[10px] min-h-[142px] max-h-[142px] min-w-[142px] max-w-[142px]"
                    />
                    <div className="flex py-3 items-center">
                      <h1 className="text-[#1e722f] text-xl">{plant.name}</h1>
                    </div>
                  </div>
                ))}
                {/* CARD ADD */}
                <div>
                  <div
                    className="flex flex-col items-center justify-center bg-white pb-1 rounded-xl border-2 border-gray-400 hover:border-[#1e722f] min-h-[199px] max-h-[199px] min-w-[145.5px] max-w-[145.5px] cursor-pointer"
                    onClick={openModal}
                  >
                    <div className="text-5xl font-bold text-[#1e722f]">+</div>
                    <div className="flex py-3 items-center">
                      <h1 className="text-[#1e722f] text-xl">Adicionar</h1>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {/* COnteúdo Dash */}
        <div className="px-2 border-t-2 border-t-green-800">
          {/* Header Dash */}
          <div className="flex flex-col justify-between items-center mx-3 px-2 mt-2">
            <div>
              <h1 className="text-6xl mb-2 text-[#1e722f] font-semibold">
                Dashboard
              </h1>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-2 py-2">
                <h1 className="text-3xl text-[#1e722f]">{selectedPlant || "Selecione uma planta"}</h1>
              </div>
              <div className="flex gap-x-1 items-center">
                <Clock10Icon size={25} color="#1e722f" />
                <h1 className="text-[#1e722f]">Período:</h1>
                <h1 className="text-[#1e722f] text-sm">
                  01/01/2024 - 31/12/2024
                </h1>
              </div>
            </div>
          </div>
          {/* Gráficos 1 */}
          <div className="flex p-2">
            <div className="grid grid-cols-3 gap-x-6 w-full">
              <div className="flex bg-white border-2 shadow-lg border-[#1e722f] rounded-2xl p-2          h-[300px] w-full">
                <h1>Média</h1>
              </div>
              <div className="flex bg-white border-2 shadow-lg border-[#1e722f] rounded-2xl p-2          h-[300px] w-full"></div>
              <div className="flex bg-white border-2 shadow-lg border-[#1e722f] rounded-2xl p-2          h-[300px] w-full"></div>
            </div>
          </div>

          {/* Gráficos 2 */}
          <div className="flex p-2">
            <div className="grid grid-cols-2 gap-x-6 w-full">
              <div className="flex bg-white border-2 shadow-lg border-[#1e722f] rounded-2xl p-2          h-[300px] w-full">
                <h1>Média</h1>
              </div>
              <div className="flex bg-white border-2 shadow-lg border-[#1e722f] rounded-2xl p-2          h-[300px] w-full"></div>
            </div>
          </div>

          {/* Gráficos 3 */}
          <div className="flex p-2">
            <div className="grid grid-cols-1 w-full">
              <div className="flex bg-white border-2 shadow-lg border-[#1e722f] rounded-2xl p-2          h-[300px] w-full">
                <h1>Média</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
