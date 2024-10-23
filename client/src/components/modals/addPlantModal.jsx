import React, { useRef, useState } from "react";
import Modal from "./index";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";

const AddPlantModal = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState("/img/Default_image.jpg"); // Estado para armazenar a URL da imagem
  const hiddenFileInput = useRef(null);

  const handleClose = () => {
    onClose();
  };

  const handleChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file); // Cria uma URL para a imagem selecionada
      setSelectedImage(imageUrl); // Atualiza o estado com a nova imagem
    }
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
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
              <h1 className="text-2xl px-3 py-2 text-[#1e722f]">
                Adicionar Planta
              </h1>
            </div>
          </div>
        }
        body={
          <>
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <div className="flex flex-col mx-1 p-2 m-2 rounded-xl justify-between gap-4 w-full">
              <div className="flex px-1 py-2 w-full flex-col justify-start">
                <label className="text-start text-lg text-[#1e722f] ml-1">
                  Nome:
                </label>
                <div className="w-full h-12 m-0">
                  <Input
                    type="text"
                    placeholder="Nome da Planta"
                    className="mt-2 w-full mb-1 rounded-xl py-6 border-2 border-green-800 bg-[#ffffff87] text-[#1e722f]"
                    required
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                  />
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
                    src={selectedImage} // Exibe a imagem selecionada ou a imagem padrão
                    alt="Imagem da Planta"
                    width={200}
                    height={200}
                    className="rounded-xl border-2 border-green-800 mt-2 text-black cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex my-1 mx-1 px-2 py-1 justify-end items-baseline">
              <Button
                className="w-1/4 h-10 bg-[#3e8721] hover:bg-[#29581f] text-white shadow-md rounded-xl hover:shadow-xl"
                type="submit"
                variant="default"
                size="default"
                // onSubmit={handleSubmit(onSubmit)}
              >
                Criar
              </Button>
            </div>
            {/* </form> */}
          </>
        }
        footer={<></>}
      />
    </>
  );
};

export default AddPlantModal;
