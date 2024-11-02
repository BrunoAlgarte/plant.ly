"use client";
import { useHeaderName } from "../utils/hooks/useHeaderName";
import useUserId from "../utils/hooks/useUserId";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import { User2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";

function Header() {
  const [isLoading, setIsLoading] = React.useState(true);
  const { user_name, clearStorage } = useHeaderName();
  const { user_id, clearUserStorage } = useUserId();
  const router = useRouter();
  
  const handleLogout = () => {
    clearStorage();
    clearUserStorage();
    router.push("/");
  };

  React.useEffect(() => {
    setIsLoading(false);
  }, [user_id, user_name, router]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="z-5 flex justify-between w-full h-20 fixed bg-[#1e722f] px-2 drop-shadow-3xl mb-2">
      <div
        className="flex items-center gap-2 pl-4 py-2 cursor-pointer"
        onClick={() => {
          router.push("/main");
        }}
      >
        <Image
          src="/img/logo-teste.png"
          width={40}
          height={40}
          alt="logo robotic"
          className="mr-6 md:mr-0 shadow-lg"
        />
        <h2 className="hidden md:block font-bold text-sm lg:text-4xl text-white">
          Plant.ly
        </h2>
      </div>
      <div className="pr-0 py-2 flex gap-x-2 items-center w-fit justify-end">
        <div className="flex gap-x-2 items-center">
          <p className="text-white text-base w-fit whitespace-nowrap">{`Olá, ${
            user_name ? user_name : "Visitante"
          }`}</p>
          <User2Icon size={25} color="#ffffff" />
        </div>
        <Button
          className="w-1/4 h-8 bg-[#ffffff] hover:bg-[#29581f] text-black hover:text-white shadow-md rounded-xl hover:shadow-xl px-8 py-3"
          onClick={handleLogout}
        >
          Sair
        </Button>
      </div>
    </div>
  );
}

export default Header;
