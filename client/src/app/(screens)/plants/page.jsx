"use client";

import AddPlantModal from "../../../components/modals/addPlantModal";
import useUserId from "../../../utils/hooks/useUserId";
import { LeafIcon, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import { toast, Bounce } from "react-toastify";
import { CircleLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import api from "../../../utils/api";
import Image from "next/image";

export default function Plants() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [plants, setPlants] = useState([]);
  const { user_id } = useUserId();
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    fetchPlants();
  };

  const fetchPlants = async () => {
    try {
      if (!user_id) {
        return;
      }

      const { data } = await api.get(`/v1/plants/user/${user_id}`);
      setPlants(data);
    } catch (error) {
      toast.error("Erro ao buscar plantas. Tente novamente.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  const deletePlant = async (plantId) => {
    try {
      if (!plantId) {
        toast.error("ID da planta inválido ou não fornecido", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        return;
      }

      await api.delete(`/v1/plants/${plantId}`);
      setPlants(plants.filter((plant) => plant.id !== plantId));
      fetchPlants();
      
      toast.success("Planta removida com sucesso!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } catch (error) {
      toast.error("Erro ao deletar planta. Tente novamente.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    fetchPlants();
  }, [user_id, AddPlantModal.onPlantAdded]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 bg-[rgb(221,220,220)]">
          <div className="px-2 mt-20 py-2">
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
                  userId={user_id}
                  onPlantAdded={fetchPlants}
                />
              </button>
            </div>
            <div className="flex flex-col p-2 gap-y-3 overflow-y-auto">
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
                        src={plant.image_url || "/img/floresta.jpg"}
                        width={150}
                        height={150}
                        alt={plant.name}
                        className="h-full mr-2 border-2 border-[#1e722f] rounded-full min-h-[100px] max-h-[100px] min-w-[100px] max-w-[100px]"
                      />
                      <div className="flex flex-col">
                        <h1 className="text-[#1e722f] text-2xl font-bold">
                          {plant.name}
                        </h1>
                        <h1 className="text-sm text-[#1e722f]">
                          {plant.type}
                        </h1>
                        <div className="flex gap-x-1 text-sm">
                          <p>Adicionado em: </p>
                          <p>
                            {new Date(plant.date_created).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-x-2">
                      <button
                        className="bg-[#1e722f] text-white rounded-3xl px-5 py-3"
                        onClick={() => {
                          router.push(`/plant/${plant._id}`);
                        }}
                      >
                        Ver
                      </button>
                      <button
                        className="bg-[#1e722f] text-white rounded-3xl p-3"
                        onClick={() => deletePlant(plant._id)}
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
