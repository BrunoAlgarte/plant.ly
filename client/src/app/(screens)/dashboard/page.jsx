"use client";
import AddPlantModal from "../../../components/modals/addPlantModal";
import useUserId from "../../../utils/hooks/useUserId";
import { PiPottedPlantLight } from "react-icons/pi";
import React, { useState, useEffect } from "react";
import { FaTemperatureLow } from "react-icons/fa6";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import { toast, Bounce } from "react-toastify";
import { CircleLoader } from "react-spinners";
import { WiHumidity } from "react-icons/wi";
import { Clock10Icon } from "lucide-react";
import { SiGrafana } from "react-icons/si";
import api from "../../../utils/api";
import Image from "next/image";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState("");
  const [selectedPlantId, setSelectedPlantId] = useState("");
  const [lastRegister, setLastRegister] = useState({});
  const [averages, setAverages] = useState({});
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

  // Buscar plantas
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
      toast.error("Erro ao buscar planta. Tente novamente.", {
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

  // Buscar médias
  const getAverages = async () => {
    try {
      if (!selectedPlantId) {
        return;
      }
      const { data } = await api.get(
        `v1/sensors/average?plantid=${selectedPlantId}&startDate=2024-11-18&endDate=2024-11-20`
      );
      setAverages(data);
    } catch (error) {
      console.error("Erro ao buscar médias:", error);
      toast.error("Erro ao buscar médias. Tente novamente.", {
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

  // Buscar último registro
  const getLastRegister = async () => {
    try {
      if (!selectedPlantId) {
        return;
      }
      const { data } = await api.get(
        `v1/sensors/last?plantid=${selectedPlantId}&startDate=2024-11-18&endDate=2024-11-20`
      );
      setLastRegister(data);
    } catch (error) {
      console.error("Erro ao buscar último registro:", error);
      toast.error("Erro ao buscar último registro. Tente novamente.", {
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
  console.log("lastRegister", lastRegister);

  useEffect(() => {
    if (user_id) {
      fetchPlants();
    }
  }, [user_id]);

  useEffect(() => {
    getAverages();
    getLastRegister();
  }, [selectedPlantId]);

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
      <div className="pt-4 h-full w-full bg-[rgb(221,220,220)] bg-cover">
        {/* Barra de plantas */}
        <div className="py-3 mt-16 overflow-x-auto">
          <div className="flex gap-x-2 px-2">
            {loading ? (
              <div className="flex justify-center items-center w-full py-10">
                <CircleLoader color="#1e722f" size={50} />
              </div>
            ) : (
              <>
                {plants.map((plant) => (
                  <div
                    key={plant._id}
                    className="flex flex-col items-center justify-center bg-white pb-1 rounded-xl border-2 border-spacing-5 border-gray-400 hover:border-[#1e722f] min-h-[199px] max-h-[199px] min-w-[145.5px] max-w-[145.5px] cursor-pointer"
                    onClick={() => {
                      setSelectedPlant(plant.name);
                      setSelectedPlantId(plant._id);
                    }}
                  >
                    <Image
                      src={plant.image || "/img/floresta.jpg"}
                      width={150}
                      height={150}
                      alt={plant.name}
                      className="mx-auto h-full mt-0.5 rounded-t-[10px] min-h-[142px] max-h-[142px] min-w-[142px] max-w-[142px]"
                    />
                    <div className="flex py-4 items-center">
                      <h1 className="text-[#1e722f] text-base">{plant.name}</h1>
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
          <div className="flex flex-col justify-between items-center mx-3 px-2 mt-5">
            {/* <div>
              <h1 className="text-6xl mb-2 text-[#1e722f] font-semibold">
                Dashboard
              </h1>
            </div> */}
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-2 py-2">
                <h1 className="text-4xl text-[#1e722f]">
                  {selectedPlant || "Selecione uma planta"}
                </h1>
              </div>
              <div className="flex gap-x-1 items-center">
                <Clock10Icon size={25} color="#1e722f" />
                <h1 className="text-[#1e722f]">Período:</h1>
                <h1 className="text-[#1e722f] text-sm">
                  18/11/2024 - 20/11/2024
                </h1>
              </div>
            </div>
          </div>

          {/* <iframe
            src="https://brunoalgter.grafana.net/public-dashboards/c35726a3560941c5af48617424b9ddb1"
            className="mx-auto mt-2 w-full h-[2300px] rounded-2xl border-2 border-[#1e722f] shadow-lg"
          ></iframe> */}

          {/* Gráficos 1 */}
          <div className="flex p-2">
            <div className="grid grid-cols-3 gap-x-6 w-full">
              <div className="flex flex-col items-center justify-center bg-white border-2 shadow-lg border-[#1e722f] rounded-2xl p-2 h-[250px] w-full">
                <h1 className="text-4xl text-[#1e722f] my-6">Médias</h1>
                <div className="col-span-1 grid grid-cols-2 gap-x-3 w-full mt-5">
                  <div className="items-center flex flex-col justify-center gap-y-3 py-4 h-full">
                    <h1 className="text-[#1e722f] text-center">
                      Temperatura média
                    </h1>
                    <div className="flex items-center gap-x-2">
                      <FaTemperatureLow size={50} color="#753824" />
                      <h1 className="text-center text-5xl">
                        {averages?.media_temperatura_do_ar || "-"}
                      </h1>
                    </div>
                  </div>
                  <div className="items-center flex flex-col justify-center gap-y-3 py-4 h-full">
                    <h1 className="text-[#1e722f] text-center">
                      Umidade média
                    </h1>
                    <div className="flex items-center gap-x-2">
                      <WiHumidity size={50} color="#21587f" />
                      <h1 className="text-center text-5xl">
                        {averages?.media_umidade_do_ar || "-"}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-2 flex flex-col bg-white border-2 shadow-lg border-[#1e722f] rounded-2xl p-2 h-[250px] w-full">
                <div className="flex flex-col justify-center w-full items-center">
                  <h1 className="flex w-fit justify-center my-2 mt-3 text-[#1e722f] text-4xl">
                    Último Registro
                  </h1>
                  <h1 className="flex w-fit justify-center text-[#1e722f] text-base">
                    {lastRegister?.timestamp
                      ? new Date(lastRegister.timestamp).toLocaleString(
                          "pt-BR",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                            timeZone: "UTC",
                          }
                        )
                      : " "}
                  </h1>
                </div>
                <div className="w-full mx-4 justify-around pl-2 pr-16 flex py-5 mt-2">
                  <div className="flex items-center gap-x-1">
                    <FaTemperatureLow
                      size={80}
                      color="#753824"
                      className="mr-2"
                    />
                    <div>
                      <h1 className="text-[#1e722f] text-2xl">Temperatura</h1>
                      <h1 className="text-5xl">
                        {lastRegister?.temperature_air || "-"}
                      </h1>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-1">
                    <WiHumidity size={100} color="#21587f" />
                    <div>
                      <h1 className="text-[#1e722f] text-2xl">Umidade</h1>
                      <h1 className="text-5xl">
                        {lastRegister?.humidity_air || "-"}
                      </h1>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-1">
                    <PiPottedPlantLight size={90} color="#1e722f" />
                    <div>
                      <h1 className="text-[#1e722f] text-2xl">Solo</h1>
                      <h1 className="text-5xl">
                        {lastRegister?.soil_moisture || "-"}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center px-10 mt-5">
            <button
              className="bg-[#1e722f] px-7 py-3 rounded-3xl"
              onClick={() =>
                window.open(
                  "https://brunoalgter.grafana.net/public-dashboards/c35726a3560941c5af48617424b9ddb1?orgId=1",
                  "_blank"
                )
              }
            >
              <div className="flex gap-x-2">
                <SiGrafana size={30} color="#fff" />
                <h1 className="text-xl text-white">
                  Grafana - Estatísticas Completas
                </h1>
              </div>
            </button>
          </div>
          <div className="h-10"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}
