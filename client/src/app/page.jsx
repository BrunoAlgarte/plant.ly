"use client";
import EditPasswordModal from "../components/modals/editPasswordModal";
import { useHeaderName } from "../utils/hooks/useHeaderName";
import AddUserModal from "../components/modals/addUserModal";
import useUserId from "../utils/hooks/useUserId";
import { Button } from "../components/ui/button";
import { toast, Bounce } from "react-toastify";
import { Input } from "../components/ui/input";
import { CircleLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import api from "../utils/api";

export default function Home() {
  const [isEditPasswordModalOpen, setIsEditPasswordModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { setUserId } = useUserId();
  const router = useRouter();

  const handleCloseEditPasswordModal = () => {
    setIsEditPasswordModalOpen(false);
  };

  const handleCloseUserModal = () => {
    setIsUserModalOpen(false);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/v1/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { setUserName } = useHeaderName.getState();
        setUserName(response.data.user.name);
        setUserId(response.data.user.id);

        toast.success("Login realizado com sucesso!", {
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

        setTimeout(() => {
          router.push("/main");
        }, 1000);
      }
    } catch (error) {
      if (error)
        console.log(error);
        toast.error(`${error?.response?.data?.message}`, {
          position: "top-center",
          autoClose: 1000,
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

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-[url('/img/bg-phot.jpg')] bg-cover bg-center">
        <form
          className="w-10/12 md:w-3/5 lg:w-1/3 min-h-full py-10 md:py-4 md:pl-2 pl-0 lg:pl-0 lg:py-10 items-center justify-center text-sm flex flex-col lg:flex-col md:flex-row rounded-3xl bg-[#edededea] shadow-xl border-3 border-green-800"
          onSubmit={handleLogin}
        >
          <Image
            src="/img/logo_novo.png"
            width={200}
            height={200}
            alt="logo"
            className="mx-auto mb-5 lg:mb-5 md:mb-0 h-full"
          />
          <div className="justify-center w-full flex flex-col items-center">
            <p className="text-green-800 text-lg">Faça login para continuar</p>
            <Input
              type="text"
              placeholder="Usuário"
              className="mt-2 w-10/12 lg:w-1/2 mb-1 rounded-xl py-6 border-2 border-green-800 bg-[#ffffff87]"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Senha"
              className="mt-2 w-10/12 lg:w-1/2 mb-6 rounded-xl py-6 border-2 border-green-800 bg-[#ffffff87]"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="w-1/2 h-10 bg-[#3e8721] hover:bg-[#29581f] text-white shadow-md rounded-xl hover:shadow-xl text-lg"
              type="submit"
              variant="default"
              size="default"
            >
              {loading ? <CircleLoader color="#ffffff" size={20} /> : "Login"}
            </Button>
            <div className="flex items-center justify-center mt-4 cursor-default">
              <p className="text-sm flex flex-col text-[#1e722f]">
                <button
                  onClick={() => setIsEditPasswordModalOpen(true)}
                  className="text-[#1e722f] hover:underline"
                >
                  Alterar senha
                </button>
              </p>
            </div>
            <div className="flex items-center justify-center mt-1 cursor-default">
              <p className="text-xs flex flex-col text-[#1e722f]">
                Não tem uma conta?{" "}
                <button
                  onClick={() => setIsUserModalOpen(true)}
                  className="text-[#1e722f] text-sm hover:underline"
                >
                  Cadastre-se
                </button>
              </p>
            </div>
            <EditPasswordModal
              isOpen={isEditPasswordModalOpen}
              onClose={handleCloseEditPasswordModal}
            />
            <AddUserModal
              isOpen={isUserModalOpen}
              onClose={handleCloseUserModal}
            />
          </div>
        </form>
      </main>
    </>
  );
}
