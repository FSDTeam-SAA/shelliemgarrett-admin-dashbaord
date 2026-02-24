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
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/campaign/${id}`,
      );
      if (!res.ok) throw new Error("Failed to fetch campaign data");
      return res.json();
    },
  });

  const campaign: Campaign | undefined = response?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans">
        <p className="text-gray-500 text-sm">Loading...</p>
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