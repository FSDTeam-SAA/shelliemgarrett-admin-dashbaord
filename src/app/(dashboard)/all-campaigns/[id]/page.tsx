"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import CampaignDetailsImage from "./_components/CampaignDetailsImage";
import Organizer from "./_components/Organizer";
import { Campaign } from "./_components/Campaign";

function Page() {
  const params = useParams();
  const id = params?.id as string;

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["singleData", id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/campaign/${id}`
      );
      if (!res.ok) throw new Error("Failed to fetch campaign data");
      return res.json();
    },
  });

  const campaign: Campaign | undefined = response?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen font-sans">
        {/* CampaignDetailsImage Skeleton */}
        <div className="w-full h-[400px] bg-gray-200 animate-pulse" />

        {/* Organizer Skeleton */}
        <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
          {/* Title */}
          <div className="h-8 w-2/3 bg-gray-200 rounded mb-4" />
          {/* Description lines */}
          <div className="h-4 w-full bg-gray-200 rounded mb-2" />
          <div className="h-4 w-5/6 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-4/6 bg-gray-200 rounded mb-8" />

          {/* Organizer card */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-14 w-14 rounded-full bg-gray-200" />
            <div className="flex flex-col gap-2">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-24 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Button */}
          <div className="h-11 w-40 bg-gray-300 rounded-full" />
        </div>
      </div>
    );
  }

  if (isError || !campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans">
        <p className="text-red-500 text-sm">Failed to load campaign.</p>
      </div>
    );
  }

  return (
    <div>
      <CampaignDetailsImage campaign={campaign} />
      <Organizer campaign={campaign} />
    </div>
  );
}

export default Page;