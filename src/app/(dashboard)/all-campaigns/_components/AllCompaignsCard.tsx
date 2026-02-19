"use client"
import { CampaignCard } from '@/components/share/CampaignCard';
import React from 'react';

const campaigns = [
  {
    id: 1,
    image: "/images/allcompanigeImage.png",
    title: 'Bringing health to those who need it most',
    description:
      'Access to healthcare should be right, not a privilege. Help us donate...',
    amount: '$20,256',
    goalAmount: '$150,000',
  },
  {
    id: 2,
    image: "/images/allcompanigeImage.png",
    badge: 'Campaign ends',
    title: 'Bringing health to those who need it most',
    description:
      'Access to healthcare should be right, not a privilege. Help us donate...',
    amount: '$11,256',
    goalAmount: '$150,000',
  },
  {
    id: 3,
   image: "/images/allcompanigeImage.png",
    badge: 'Expand in Nepal',
    title: 'Bringing health to those who need it most',
    description:
      'Access to healthcare should be right, not a privilege. Help us donate...',
    amount: '$44,256',
    goalAmount: '$150,000',
  },
  {
    id: 3,
   image: "/images/allcompanigeImage.png",
    badge: 'Expand in Nepal',
    title: 'Bringing health to those who need it most',
    description:
      'Access to healthcare should be right, not a privilege. Help us donate...',
    amount: '$44,256',
    goalAmount: '$150,000',
  },
  {
    id: 3,
   image: "/images/allcompanigeImage.png",
    badge: 'Expand in Nepal',
    title: 'Bringing health to those who need it most',
    description:
      'Access to healthcare should be right, not a privilege. Help us donate...',
    amount: '$44,256',
    goalAmount: '$150,000',
  },
  {
    id: 3,
   image: "/images/allcompanigeImage.png",
    badge: 'Expand in Nepal',
    title: 'Bringing health to those who need it most',
    description:
      'Access to healthcare should be right, not a privilege. Help us donate...',
    amount: '$44,256',
    goalAmount: '$150,000',
  },
  {
    id: 3,
   image: "/images/allcompanigeImage.png",
    badge: 'Expand in Nepal',
    title: 'Bringing health to those who need it most',
    description:
      'Access to healthcare should be right, not a privilege. Help us donate...',
    amount: '$44,256',
    goalAmount: '$150,000',
  },
  {
    id: 3,
   image: "/images/allcompanigeImage.png",
    badge: 'Expand in Nepal',
    title: 'Bringing health to those who need it most',
    description:
      'Access to healthcare should be right, not a privilege. Help us donate...',
    amount: '$44,256',
    goalAmount: '$150,000',
  },
  {
    id: 3,
   image: "/images/allcompanigeImage.png",
    badge: 'Expand in Nepal',
    title: 'Bringing health to those who need it most',
    description:
      'Access to healthcare should be right, not a privilege. Help us donate...',
    amount: '$44,256',
    goalAmount: '$150,000',
  },
  {
    id: 3,
   image: "/images/allcompanigeImage.png",
    badge: 'Expand in Nepal',
    title: 'Bringing health to those who need it most',
    description:
      'Access to healthcare should be right, not a privilege. Help us donate...',
    amount: '$44,256',
    goalAmount: '$150,000',
  },
  
];

export function AllCompaignsCard() {
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">All Campaign</h2>
        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          See all
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            image={campaign.image}
            badge={campaign.badge}
            title={campaign.title}
            description={campaign.description}
            amount={campaign.amount}
            goalAmount={campaign.goalAmount}
            onViewDetails={() => console.log(`View details: ${campaign.id}`)}
          />
        ))}
      </div>
    </div>
  );
}