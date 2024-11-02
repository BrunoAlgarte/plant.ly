"use client";
import { useHeaderName } from "../../../utils/hooks/useHeaderName";
import useUserId from "../../../utils/hooks/useUserId";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import React from "react";

export default function Main() {
  const { user_name } = useHeaderName();
  const { user_id } = useUserId();
  const router = useRouter();

  useEffect(() => {
    if (!user_id || !user_name) {
      router.push('/');
    }
  }, [user_id, user_name, router]);

  return (
    <>
      <div className="flex flex-col justify-between h-screen">
        <Header />
        <div className="px-2 pt-4 h-full w-screen bg-[rgb(221,220,220)] bg-cover">
          <div className="grid grid-cols-2 gap-x-28 mx-10 p-2 px-10 mt-32">
            <div
              className="flex justify-start items-end bg-[url('/img/floresta.jpg')] bg-cover bg-center h-[400px] w-full rounded-2xl border-2 border-gray-300 p-2 hover:border-5 hover:border-[#1e722f] shadow-md hover:shadow-2xl cursor-pointer"
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              <h1 className="text-6xl text-white h-full flex items-end uppercase">
                Dash
              </h1>
            </div>
            <div
              className="flex justify-start items-baseline bg-[url('/img/canto_1.jpg')] bg-cover bg-center h-[400px] w-full rounded-2xl border-2 border-gray-600 p-2 hover:border-5 hover:border-[#1e722f] shadow-md hover:shadow-2xl cursor-pointer"
              onClick={() => {
                router.push("/plants");
              }}
            >
              <h1 className="text-6xl text-[#1e722f] h-full flex items-end uppercase">
                Plantas
              </h1>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
