/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";

interface DonerCardProps {
  name: string;
  amount: string;
  avatar?: string; // optional
  onViewProfile?: () => void;
}

export function DonerCard({ name, amount, avatar, onViewProfile }: DonerCardProps) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");

  return (
    <div className="flex items-center gap-3">
      {avatar ? (
        <div className="relative w-[102px] h-[102px] rounded-full overflow-hidden bg-gray-200">
          <img src={avatar} alt={name} className="object-cover w-full h-full" />
        </div>
      ) : (
        <div className="flex items-center justify-center w-[102px] h-[102px] rounded-full bg-gray-400 text-white text-2xl font-bold">
          {initials}
        </div>
      )}
      <div className="text-start">
        <p className="font-semibold text-[#000000] text-[30px]">{name}</p>
        <p className="text-xl font-normal text-[#000000]">Donated {amount}</p>
        <button
          onClick={onViewProfile}
          className="text-[#0024DA] text-xl font-medium hover:text-[#0024DA]/90 mt-1"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}