"use client";
import { Button } from "../components/ui/button";
import { toast, Bounce } from "react-toastify";
import { Input } from "../components/ui/input";
import { useState, useEffect } from "react";
// import Footer from "../components/footer";
import Image from "next/image";
import axios from "axios";
import React from "react";

export default function Home() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const id = '67195a784f728be2f12ebc09';

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3030/v1/users/${id}`, {
      });
      console.log(response);
    }
    catch (error) {
      console.log(error);
    }
  }        

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3030/v1/auth/login", {
        email,
        password,
      });
      if (response.status === 200) {
        toast.success("Login efetuado com sucesso!", {
          position: "top-center",
          transition: Bounce,
        });
        window.location.href = "/main";
      }
    }
    catch (error) {
      console.log(error);
      toast.error("Usuário ou senha inválidos!", {
        position: "top-center",
        transition: Bounce,
      });
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-[url('/img/bg-phot.jpg')] bg-cover bg-center">
        <div className="w-10/12 md:w-3/5 lg:w-1/3 min-h-full py-10 md:py-4 md:pl-2 pl-0 lg:pl-0 lg:py-10 items-center justify-center text-sm flex flex-col lg:flex-col md:flex-row rounded-3xl bg-[#edededd4] shadow-xl border-3 border-green-800">
          <Image
            src="/img/logo-teste.png"
            width={260}
            height={260}
            alt="logo"
            className="mx-auto mb-10 lg:mb-10 md:mb-0 h-full"
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
              onClick={() => handleLogin()}
            >
              Login
            </Button>
            {/* {message && <p className="mt-4 text-white">{message}</p>} */}
          </div>
        </div>
        {/* <Footer /> */}
      </main>
    </>
  );
}
