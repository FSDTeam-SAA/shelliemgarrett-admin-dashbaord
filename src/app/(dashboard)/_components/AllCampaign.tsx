"use client";

import { CampaignCard } from "@/components/share/CampaignCard";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

// API types
interface Media {
  url: string;
  public_id: string;
  _id: string;
}

interface Campaign {
  _id: string;
  name: string;
  description: string;
  media: Media[];
  totalRaised: number;
  raiseGoal: string;
}

interface CampaignResponse {
  status: boolean;
  message: string;
  data: {
    campaigns: Campaign[];
  };
}

export function AllCampaign() {
  const session = useSession();
  const TOKEN = session?.data?.user?.accessToken;

  const { data, isLoading, isError, error } = useQuery<CampaignResponse>({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/campaign`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        },
      );
      if (!res.ok) throw new Error("Failed to fetch campaigns");
      return res.json();
    },
    enabled: !!TOKEN,
  });

  if (isLoading) return <p>Loading campaigns...</p>;
  if (isError)
    return <p className="text-red-500">Error: {(error as Error).message}</p>;

  const campaigns = data?.data?.campaigns?.slice(0, 3) ?? []; // top 3 campaigns

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">All Campaign</h2>
        <Link href="/all-campaigns">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            See all
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign._id}
            id={campaign?._id}
            image={campaign.media?.[0]?.url ?? "/images/allcompanigeImage.png"} // fallback image
            badge="" // optionally add badge logic
            title={campaign.name}
            description={campaign.description}
            amount={`$${campaign.totalRaised}`}
            goalAmount={
              campaign.raiseGoal ? `$${campaign.raiseGoal}` : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
