"use client";
import { useHeaderName } from "../../../../utils/hooks/useHeaderName";
import useUserId from "../../../../utils/hooks/useUserId";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import React from "react";

export default function Main() {
  const { user_name } = useHeaderName();
  const { user_id } = useUserId();
  const router = useRouter();

  // useEffect(() => {
  //   if (!user_id || !user_name) {
  //     router.push('/');
  //   }
  // }, [user_id, user_name, router]);

  return (
    <>
      <div className="flex flex-col justify-between h-screen">
        <Header />
        <div className="px-2 pt-4 h-full w-full bg-[rgb(221,220,220)] bg-cover">
          <div className="flex justify-between items-center mt-20 px-2">
            <div>
              <h1 className="text-2xl font-bold text-[#1e722f]">
                NOME DA PLANTA
              </h1>
              <h1 className="text-sm text-[#1e722f]">tipo da planta</h1>
            </div>
            <div className="flex gap-x-1 text-sm text-[#1e722f]">
              <p>Adicionado em: </p>
              <p>data</p>
            </div>
          </div>
          <div className="mt-4 w-full border px-2 py-5 border-blue-500">
            <div className="border-2 border-gray-500 rounded-2xl shadow-lg w-[50%] grid grid-cols-2 mx-auto px-4 py-2 gap-y-2">
              <div>Tipo:</div>
              <div>xxxxxxxxxxxxx</div>

              <div>Nome científico:</div>
              <div>xxxxxxxxxxxxx</div>

              <div>Como regar:</div>
              <div>xxxxxxxxxxxxx</div>

              <div>Sol:</div>
              <div>xxxxxxxxxxxxx</div>

              <div>Solo ideal:</div>
              <div>xxxxxxxxxxxxx</div>

              <div>Temperatura ideal:</div>
              <div>xxxxxxxxxxxxx</div>

              <div>Tempo de crescimento:</div>
              <div>xxxxxxxxxxxxx</div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
