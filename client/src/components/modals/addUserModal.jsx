"use client";
import { toast, Bounce } from "react-toastify";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import axios from "axios";

export default function ModalRegister({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    plants: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Por favor, preencha todos os campos", {
        position: "top-center",
        theme: "light",
        transition: Bounce,
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3030/v1/users", {
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        plants: [],
      });
      if (response.status === 201) {
        toast.success("Cadastro realizado com sucesso!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        setTimeout(() => {
          setFormData({ name: "", email: "", password: "", plants: [] });
          onClose();
        }, 2500);
      }
    } catch (error) {
      toast.error(
        `${error?.response?.data?.message || "Erro ao realizar cadastro"}`,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div
        className="w-[600px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white p-8 rounded-2xl">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#1e722f]">Cadastro</h1>
            <button className="text-black text-xl" onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} method="POST" className="mt-4">
            <div className="flex flex-col mb-4">
              <label className="mb-2 text-[#1e722f]">Nome</label>
              <div className="w-full h-12 m-0">
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nome completo"
                  className="mt-1 w-full mb-1 rounded-xl py-6 border-2 border-green-800 bg-[#ffffff87] text-[#1e722f]"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-2 text-[#1e722f]">Email</label>
              <div className="w-full h-12 m-0">
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email do usuário"
                  className="mt-1 w-full mb-1 rounded-xl py-6 border-2 border-green-800 bg-[#ffffff87] text-[#1e722f]"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col mb-6">
              <label className="mb-2 text-[#1e722f]">Senha</label>
              <div className="w-full h-12 m-0">
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Senha"
                  className="mt-1 w-full mb-1 rounded-xl py-6 border-2 border-green-800 bg-[#ffffff87] text-[#1e722f]"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                type="button"
                disabled={isLoading}
                className="bg-[#1e722f] text-white px-6 py-2 rounded-lg hover:bg-[#1e722f]/90 disabled:opacity-50"
              >
                {isLoading ? "Cadastrando..." : "Cadastrar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
