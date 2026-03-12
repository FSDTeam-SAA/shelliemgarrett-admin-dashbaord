"use client";

import { DonerCard } from "@/components/share/DonerCard";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";

interface TopDonor {
  name: string;
  email: string;
  totalAmount: number;
}

interface DonationResponse {
  status: boolean;
  message: string;
  data: {
    topDonors: TopDonor[];
  };
}

export function TopDonors() {
  const session = useSession();
  const TOKEN = session?.data?.user?.accessToken;

  const { data, isLoading, isError, error } = useQuery<DonationResponse>({
    queryKey: ["donationData"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/admin/stats`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch donation data");

      return res.json();
    },
    enabled: !!TOKEN,
  });

  if (isError)
    return <p className="text-red-500">Error: {(error as Error).message}</p>;

  // ✅ only topDonors
  const donors = data?.data?.topDonors ?? [];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm my-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-200">
        Top Donors
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="w-[102px] h-[102px] rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4 rounded" />
                  <Skeleton className="h-4 w-1/2 rounded" />
                  <Skeleton className="h-4 w-1/4 rounded" />
                </div>
              </div>
            ))
          : donors.map((donor, index) => (
              <DonerCard
                key={index}
                name={donor.name}
                email={donor.email}
                amount={`$${donor.totalAmount}`}
                avatar={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  donor.name
                )}&background=random`}
                onViewProfile={() =>
                  console.log(`View profile: ${donor.name}`)
                }
              />
            ))}
      </div>
    </div>
  );
}