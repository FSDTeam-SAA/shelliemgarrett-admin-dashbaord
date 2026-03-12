"use client";

import Header from "@/components/share/Header";
import { Sidebar } from "@/components/share/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

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