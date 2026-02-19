"use client"
import { DonerCard } from '@/components/share/DonerCard';
import React from 'react';

const topDonors = [
  {
    id: 1,
    name: 'Ken Adams',
    amount: '$350',
    avatar: '/images/topDonerImage.jpg', // replace with real paths
  },
  {
    id: 2,
    name: 'Regina Phalange',
    amount: '$330',
    avatar: '/images/topDonerImage.jpg',
  },
  {
    id: 3,
    name: 'Mike',
    amount: '$310',
    avatar: '/images/topDonerImage.jpg',
  },
];

export function TopDonors() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm my-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-200">
        Top Donors
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
        {topDonors.map((donor) => (
          <DonerCard
            key={donor.id}
            name={donor.name}
            amount={donor.amount}
            avatar={donor.avatar}
            onViewProfile={() => console.log(`View profile: ${donor.name}`)}
          />
        ))}
      </div>
    </div>
  );
}