"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import React, { useRef, useState } from "react";
import { toast, Bounce } from "react-toastify";
import { CircleLoader } from "react-spinners";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import api from "../../utils/api";
import Image from "next/image";
import Modal from "./index";

const AddPlantModal = ({ isOpen, onClose, userId }) => {
  const [selectedImage, setSelectedImage] = useState("/img/Default_image.jpg");
  const [imageBase64, setImageBase64] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const hiddenFileInput = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
  });

  const handleClose = () => {
    setFormData({ name: "", type: "" });
    setSelectedImage("/img/Default_image.jpg");
    setImageBase64(null);
    onClose();
  };

  const handleChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTypeChange = (value) => {
    setFormData(prev => ({
      ...prev,
      type: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.name || !formData.type) {
      toast.error("Por favor, preencha todos os campos", {
        position: "top-center",
        theme: "light",
        transition: Bounce,
      });
      setIsLoading(false);
      return;
    }

    try {
      let finalImage = imageBase64;
      if (!finalImage) {
        const response = await fetch("/img/icons/soil.png");
        const blob = await response.blob();
        const reader = new FileReader();
        finalImage = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      }

      const response = await api.post(`/v1/plants/user/${userId}`, {
        user_id: userId,
        name: formData.name.trim(),
        type: formData.type,
        image: finalImage
      });

      if (response.status === 201) {
        toast.success("Planta adicionada com sucesso!", {
          position: "top-center",
          theme: "colored",
          transition: Bounce,
          autoClose: 1000,
        });
        handleClose();
      }
    } catch (error) {
      toast.error(
        `${error?.response?.data?.message || "Erro ao adicionar planta"}`,
        {
          position: "top-center",
          theme: "light",
          transition: Bounce,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        zIndex={999}
        isOpen={isOpen}
        onClose={handleClose}
        positionClose="left"
        header={
          <div className="flex flex-col">
            <div className="justify-start">
              <h1 className="text-2xl px-1 py-2 text-[#1e722f]">
                Adicionar Planta
              </h1>
            </div>
          </div>
        }
        body={
          <>
            {isLoading ? (
              <div className="flex justify-center items-center h-[400px]">
                <CircleLoader color="#3e8721" size={50} />
              </div>
            ) : (
              <>
                <div className="flex flex-col mx-1 p-2 rounded-xl justify-between w-full">
                  <div className="flex px-1 py-2 w-full flex-col justify-start">
                    <label className="text-start text-lg text-[#1e722f] ml-1">
                      Nome:
                    </label>
                    <div className="w-full h-12 m-0">
                      <Input
                        type="text"
                        name="name"
                        placeholder="Nome da Planta"
                        className="w-full mb-1 rounded-xl py-6 border-2 border-green-800 bg-[#ffffff87] text-[#1e722f]"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="flex px-1 py-2 w-full flex-col justify-start">
                    <label className="text-start text-lg text-[#1e722f] ml-1">
                      Tipo:
                    </label>
                    <div className="w-full h-12 m-0">
                      <Select onValueChange={handleTypeChange} value={formData.type}>
                        <SelectTrigger className="w-full mb-1 rounded-xl py-6 border-2 border-green-800 bg-[#ffffff87] text-[#1e722f] outline-none">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#ffffff] rounded-xl px-2 text-[#1e722f]">
                          <SelectItem value="Folhosas">Folhosa</SelectItem>
                          <SelectItem value="Raízes">Raiz</SelectItem>
                          <SelectItem value="Frutos">Fruto</SelectItem>
                          <SelectItem value="Leguminosas">Leguminosa</SelectItem>
                          <SelectItem value="Condimentos">Condimento</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex px-1 py-2 w-full flex-col justify-start">
                    <label className="text-start text-lg text-[#1e722f] ml-1">
                      Imagem:
                    </label>
                    <input
                      type="file"
                      ref={hiddenFileInput}
                      onChange={handleChange}
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    <div className="flex justify-center">
                      <Image
                        onClick={handleClick}
                        src={selectedImage}
                        alt="Imagem da Planta"
                        width={180}
                        height={180}
                        className="rounded-xl border-2 border-green-800 mt-2 text-black cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex my-1 mx-1 px-2 py-1 justify-end items-baseline">
                  <Button
                    className="w-1/4 h-10 bg-[#3e8721] hover:bg-[#29581f] text-white shadow-md rounded-xl hover:shadow-xl"
                    type="button"
                    variant="default"
                    size="default"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? "Criando..." : "Criar"}
                  </Button>
                </div>
              </>
            )}
          </>
        }
        footer={<></>}
      />
    </>
  );
};

export default AddPlantModal;
