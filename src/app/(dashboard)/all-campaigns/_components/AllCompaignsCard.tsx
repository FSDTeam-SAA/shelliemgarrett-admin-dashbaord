"use client";

import { CampaignCard } from "@/components/share/CampaignCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";

interface Campaign {
  _id: string;
  name: string;
  description: string;
  media: { url: string }[];
  totalRaised: number;
  raiseGoal: string;
}

interface CampaignResponse {
  status: boolean;
  message: string;
  data: {
    campaigns: Campaign[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export function AllCompaignsCard() {
  const session = useSession();
  const TOKEN = session?.data?.user?.accessToken;

  const { data: allCom, isLoading, isError, error } = useQuery<CampaignResponse>({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/campaign`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch campaigns");
      return res.json();
    },
    enabled: !!TOKEN,
  });

  if (isError) return <p className="text-red-500">Error: {(error as Error).message}</p>;

  const campaigns = allCom?.data?.campaigns ?? [];

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">All Campaigns</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading
          ? // ─── Skeleton Cards ───────────────────────────────────
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3 rounded-lg overflow-hidden border border-gray-200 bg-white p-4">
                {/* Image skeleton */}
                <Skeleton className="h-[180px] w-full rounded-md" />
                {/* Title skeleton */}
                <Skeleton className="h-5 w-3/4" />
                {/* Description skeleton */}
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                {/* Amount skeleton */}
                <div className="flex justify-between mt-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))
          : // ─── Real Cards ───────────────────────────────────────
            campaigns.map((campaign) => (
              <CampaignCard
                key={campaign._id}
                id={campaign._id}
                image={campaign.media[0]?.url || "/images/allcompanigeImage.png"}
                title={campaign.name}
                description={campaign.description}
                amount={campaign.totalRaised.toString()}
                goalAmount={campaign.raiseGoal}
              />
            ))}
      </div>
    </div>
  );
}