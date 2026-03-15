"use client";

import Header from "@/components/share/Header";
import { Sidebar } from "@/components/share/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="w-full mt-[80px] p-6 bg-[#EDEEF1] lg:ml-[300px]">
          {children}
        </div>
      </div>
    </>
  );
}