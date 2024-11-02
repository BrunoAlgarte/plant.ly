"use client";

import AddPlantModal from "../../../components/modals/addPlantModal";
import useUserId from "../../../utils/hooks/useUserId";
import { LeafIcon, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import { CircleLoader } from "react-spinners";
import api from "../../../utils/api";
import Image from "next/image";

export default function Plants() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [plants, setPlants] = useState([]);
  const { user_id } = useUserId();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchPlants = async () => {
    try {
      if (!user_id) {
        console.error("ID do usuário não encontrado");
        return;
      }

      const { data } = await api.get(`/v1/plants/user/${user_id}`);
      setPlants(data);
    } catch (error) {
      console.error("Erro ao buscar plantas:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePlant = async (plantId) => {
    try {
      await api.delete(`/plants/${plantId}`);
      setPlants(plants.filter((plant) => plant.id !== plantId));
    } catch (error) {
      console.error("Erro ao deletar planta:", error);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, [user_id]);

  return (
    <>
      <div className="flex flex-col justify-between h-screen">
        <Header />
        <div className="pt-4 h-full w-screen bg-[rgb(221,220,220)] bg-cover">
          <div className="px-2 mt-16 py-2">
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
                <AddPlantModal
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  onPlantAdded={fetchPlants}
                />
              </button>
            </div>
            <div className="flex flex-col p-2 gap-y-3">
              {loading ? (
                <div className="flex justify-center items-center h-full py-10">
                  <CircleLoader color="#1e722f" size={100} />
                </div>
              ) : plants.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-full py-20">
                  <Image
                    src="/img/vasinho_triste.png"
                    width={120}
                    height={120}
                    alt="Vasinho"
                  />
                  <p className="text-2xl text-[#1e722f] font-bold">
                    Nenhuma planta cadastrada
                  </p>
                </div>
              ) : (
                plants.map((plant) => (
                  <div
                    key={plant.id}
                    className="p-3 flex w-full bg-gray-200 rounded-2xl border-2 border-gray-400 hover:border-[#1e722f] items-center justify-between shadow-lg"
                  >
                    <div className="flex gap-x-3 items-center">
                      <Image
                        src={plant.image_url || "/img/plante_default.jpg"}
                        width={150}
                        height={150}
                        alt={plant.name}
                        className="h-full mr-2 border-2 border-[#1e722f] rounded-full min-h-[100px] max-h-[100px] min-w-[100px] max-w-[100px]"
                      />
                      <div className="flex flex-col">
                        <h1 className="text-[#1e722f] text-2xl font-bold mb-2">
                          {plant.name}
                        </h1>
                        <div className="flex gap-x-1 text-sm">
                          <p>Adicionado em: </p>
                          <p>
                            {new Date(plant.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-x-2">
                      <button
                        className="bg-[#1e722f] text-white rounded-3xl px-5 py-3"
                        onClick={() => {
                          window.location.href = `/dashboard/${plant.id}`;
                        }}
                      >
                        Ver
                      </button>
                      <button
                        className="bg-[#1e722f] text-white rounded-3xl p-3"
                        onClick={() => deletePlant(plant.id)}
                      >
                        <Trash2Icon size={25} color="#ffffff" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
