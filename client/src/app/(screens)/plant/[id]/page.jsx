"use client";
import { useHeaderName } from "../../../../utils/hooks/useHeaderName";
import useUserId from "../../../../utils/hooks/useUserId";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import { IoIosArrowBack } from "react-icons/io";
import { toast, Bounce } from "react-toastify";
import { CircleLoader } from "react-spinners";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import api from "../../../../utils/api";
import Image from "next/image";
import React from "react";

export default function Plant() {
  const { user_name } = useHeaderName();
  const { user_id } = useUserId();
  const router = useRouter();
  const { id } = useParams();

  const [specie_name, setSpecieName] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [plant, setPlant] = React.useState([]);
  const [types, setTypes] = React.useState([]);

  const getPlant = async () => {
    try {
      if (!user_id) {
        return;
      }

      const { data } = await api.get(`/v1/plants/${id}`);
      setPlant(data);
      setSpecieName(data.type);
    } catch (error) {
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

  const getTypes = async () => {
    try {
      if (!user_id) {
        return;
      }

      const { data } = await api.get(`/v1/species/name/${specie_name}`);
      setTypes(data);
    } catch (error) {
      toast.error("Erro ao buscar tipo de planta. Tente novamente.", {
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

  React.useEffect(() => {
    if (user_id) {
      getPlant();
    }
  }, [user_id, id]);

  React.useEffect(() => {
    if (specie_name) {
      getTypes();
    }
  }, [specie_name]);

  return (
    <>
      <div className="flex flex-col justify-between h-screen">
        <Header />
        <div className="px-2 pt-1 h-full w-full bg-[rgb(221,220,220)] bg-cover mt-20">
          <div className="flex items-center gap-x-2">
            <IoIosArrowBack
              className="text-xl text-[#1e722f] cursor-pointer"
              size={30}
              onClick={() => router.push("/plants")}
            />
          </div>
          <div className="w-full  px-2 py-1">
            <div className="border-2 border-[#1e722f] bg-white rounded-3xl shadow-lg w-[70%] grid grid-cols-5 mx-auto px-4 py-2 gap-y-2 gap-x-4">
              {loading ? (
                <div className="flex justify-center items-center h-full w-full py-10 col-span-5">
                  <CircleLoader color="#1e722f" size={100} />
                </div>
              ) : (
                <>
                  <div className="col-span-2 flex justify-between items-center px-2">
                    <div className="flex items-center gap-x-2">
                      <div>
                        <Image
                          src={plant.image || "/img/plante_03.jpg"}
                          alt="Planta"
                          width={200}
                          height={200}
                          className="rounded-full w-64 h-64 border-4 border-[#1e722f] mb-2 shadow-lg"
                        />
                        <h1 className="text-4xl font-bold text-[#1e722f]">
                          {plant?.name}
                        </h1>
                        <h1 className="text-base text-[#1e722f]">
                          {plant?.type}
                        </h1>
                        <div className="flex gap-x-1 text-sm text-[#1e722f]">
                          <p>Adicionado em: </p>
                          <p>
                            {new Date(plant.date_created).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 p-2">
                    <div className="flex items-center gap-x-2 rounded-full px-2 shadow-lg border-2 border-[#1e722f]">
                      <div className="flex items-center gap-x-2 py-2">
                        <Image
                          src="/img/icons/leaf.png"
                          alt="Tipo"
                          width={40}
                          height={40}
                          className="shadow-lg rounded-full border-2 border-[#1e722f] object-contain p-1"
                        />
                        <p className="text-2xl font-bold text-[#1e722f]">
                          Tipo:
                        </p>
                      </div>
                      <div>{types?.name}</div>
                    </div>

                    <div className="flex items-center gap-x-2 rounded-full px-2 shadow-lg border-2 border-[#1e722f] mt-2">
                      <div className="flex items-center gap-x-2 py-2">
                        <Image
                          src="/img/icons/botanical.png"
                          alt="Nome científico"
                          width={40}
                          height={40}
                          className="shadow-lg rounded-full border-2 border-[#1e722f] p-0.5"
                        />
                        <p className="text-2xl font-bold text-[#1e722f]">
                          Nome científico:
                        </p>
                      </div>
                      <div>{types?.scientific_name}</div>
                    </div>

                    <div className="flex items-center gap-x-2 rounded-full px-2 shadow-lg border-2 border-[#1e722f] mt-2">
                      <div className="flex items-center gap-x-2 py-2">
                        <Image
                          src="/img/icons/watering-can.png"
                          alt="Como regar"
                          width={40}
                          height={40}
                          className="shadow-lg rounded-full border-2 border-[#1e722f] p-0.5"
                        />
                        <p className="text-2xl font-bold text-[#1e722f]">
                          Rega:
                        </p>
                      </div>
                      <div className="text-sm w-3/4">
                        {types?.watering_tips}
                      </div>
                    </div>

                    <div className="flex items-center gap-x-2 rounded-full px-2 shadow-lg border-2 border-[#1e722f] mt-2">
                      <div className="flex items-center gap-x-2 py-2">
                        <Image
                          src="/img/icons/sun.png"
                          alt="Sol"
                          width={40}
                          height={40}
                          className="shadow-lg rounded-full border-2 border-[#1e722f] p-1"
                        />
                        <p className="text-2xl font-bold text-[#1e722f]">
                          Sol:
                        </p>
                      </div>
                      <div>{types?.sunlight_tips}</div>
                    </div>

                    <div className="flex items-center gap-x-2 rounded-full px-2 shadow-lg border-2 border-[#1e722f] mt-2">
                      <div className="flex items-center gap-x-2 py-2">
                        <Image
                          src="/img/icons/soil.png"
                          alt="Solo"
                          width={40}
                          height={40}
                          className="shadow-lg rounded-full border-2 border-[#1e722f] p-0.5"
                        />
                        <p className="text-2xl font-bold text-[#1e722f]">
                          Solo:
                        </p>
                      </div>
                      <div>{types?.soil_tips}</div>
                    </div>

                    <div className="flex items-center gap-x-2 rounded-full px-2 shadow-lg border-2 border-[#1e722f] mt-2">
                      <div className="flex items-center gap-x-2 py-2">
                        <Image
                          src="/img/icons/thermometer.png"
                          alt="Temperatura"
                          width={40}
                          height={40}
                          className="shadow-lg rounded-full border-2 border-[#1e722f] p-0.5"
                        />
                        <p className="text-2xl font-bold text-[#1e722f]">
                          Temperatura:
                        </p>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <p className="text-[#9b2727]">
                          Min {types?.temperature_min}°C
                        </p>
                        <p> - </p>
                        <p className="text-[#1e722f]">
                          Max {types?.temperature_max}°C
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-x-2 rounded-full px-2 shadow-lg border-2 border-[#1e722f] mt-2">
                      <div className="flex items-center gap-x-2 py-2">
                        <Image
                          src="/img/icons/growing-plant.png"
                          alt="Crescimento"
                          width={40}
                          height={40}
                          className="shadow-lg rounded-full border-2 border-[#1e722f] p-1"
                        />
                        <p className="text-2xl font-bold text-[#1e722f]">
                          Crescimento:
                        </p>
                      </div>
                      <div>{types?.growth_time}</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
