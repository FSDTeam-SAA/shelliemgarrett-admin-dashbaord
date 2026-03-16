"use client";

import { CampaignCard } from "@/components/share/CampaignCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import React from "react";

interface Campaign {
  _id: string;
  name: string;
  description: string;
  media: { url: string }[];
  totalRaised: number;
  raiseGoal: number;
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
  const queryClient = useQueryClient();

  const { data: allCom, isLoading, isError, error } = useQuery<CampaignResponse>({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/campaign`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch campaigns");
      return res.json();
    },
    enabled: !!TOKEN,
  });

  // ─── Delete Mutation ──────────────────────────────────────────────────
  const deleteCampaignMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/campaign/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to delete campaign");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Campaign deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to delete campaign");
    },
  });

  if (isError)
    return <p className="text-red-500">Error: {(error as Error).message}</p>;

  const campaigns = allCom?.data?.campaigns ?? [];

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">All Campaigns</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 rounded-lg overflow-hidden border border-gray-200 bg-white p-4"
              >
                <Skeleton className="h-[180px] w-full rounded-md" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="flex justify-between mt-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))
          : campaigns.map((campaign) => (
              <CampaignCard
                key={campaign._id}
                id={campaign._id}
                image={
                  campaign.media[0]?.url || "/images/allcompanigeImage.png"
                }
                title={campaign.name}
                description={campaign.description}
                amount={campaign.totalRaised.toString()}
                goalAmount={
                  campaign.raiseGoal ? campaign.raiseGoal.toString() : undefined
                }
                progress={
                  campaign.raiseGoal > 0
                    ? Math.min(
                        Math.round(
                          (campaign.totalRaised / campaign.raiseGoal) * 100
                        ),
                        100
                      )
                    : 0
                }
                onDelete={() => deleteCampaignMutation.mutate(campaign._id)}
                isDeleting={
                  deleteCampaignMutation.isPending &&
                  deleteCampaignMutation.variables === campaign._id
                }
              />
            ))}
      </div>
    </div>
  );
}