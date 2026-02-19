import React from 'react';
import Image from 'next/image';

interface DonorProfileProps {
  name: string;
  amount: string;
  avatar: string;
  onViewProfile?: () => void;
}

export function DonerCard({
  name,
  amount,
  avatar,
  onViewProfile,
}: DonorProfileProps) {
  return (
    <div className="flex  items-center gap-3">
      <div className="relative w-[102px] h-[102px] rounded-full overflow-hidden bg-gray-200">
        <Image
          src={avatar}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
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