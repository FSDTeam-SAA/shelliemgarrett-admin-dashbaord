

"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

// ────────────────────────────────────────────────
// Types (based on your API response)
// ────────────────────────────────────────────────
interface Donor {
  name: string;
  email: string;
  mobile: string;
  country: string;
  city: string;
}

interface Campaign {
  _id: string;
  name: string;
  description: string;
  totalRaised: number;
  raiseGoal: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

interface Donation {
  _id: string;
  campaignId: Campaign | null;
  studentId: string;
  donor: Donor;
  amount: number;
  paymentStatus: "paid" | "pending";
  createdAt: string;
  updatedAt: string;
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
}

interface DonationsResponse {
  status: boolean;
  message: string;
  data: {
    donations: Donation[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

function getPaginationItems(currentPage: number, totalPages: number): Array<number | "ellipsis"> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages];
}

// ────────────────────────────────────────────────
// Icons (unchanged)
// ────────────────────────────────────────────────
function SaveIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}

// ────────────────────────────────────────────────
// Skeleton Row
// ────────────────────────────────────────────────
function DonationRowSkeleton() {
  return (
    <tr className="border-b border-[#00000014]">
      <td className="px-5 py-2.5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
          <div className="h-5 w-36 bg-gray-200 rounded animate-pulse" />
        </div>
      </td>
      <td className="px-4 py-2.5 text-center">
        <div className="h-5 w-40 bg-gray-200 rounded mx-auto animate-pulse" />
      </td>
      <td className="px-4 py-2.5 text-center">
        <div className="h-5 w-16 bg-gray-200 rounded mx-auto animate-pulse" />
      </td>
      <td className="px-4 py-2.5 text-center">
        <div className="h-5 w-32 bg-gray-200 rounded mx-auto animate-pulse" />
      </td>
      <td className="px-4 py-2.5 text-center">
        <div className="h-5 w-24 bg-gray-200 rounded mx-auto animate-pulse" />
      </td>
    </tr>
  );
}

// ────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────
export default function DonationsList() {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useQuery<DonationsResponse, Error>({
    queryKey: ["donations", token, page, limit],
    enabled: !!token,
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/donation?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch donations");
      }

      return res.json();
    },
    staleTime: 3 * 60 * 1000, // 3 minutes
  });

  const donations = data?.data.donations ?? [];
  const pagination = data?.data.pagination;
  const total = pagination?.total ?? 0;
  const currentPage = pagination?.page ?? page;
  const totalPages = pagination?.totalPages ?? 1;
  const from = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const to = total === 0 ? 0 : Math.min(currentPage * limit, total);
  const pageItems = getPaginationItems(currentPage, totalPages);

  // Format date helper
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error loading donations: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-center relative mb-5">
        <h1 className="text-[48px] font-medium text-[#000000]">Donations</h1>
        <button className="absolute right-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer">
          Save <SaveIcon />
        </button>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden border-t border-b border-[#00000014]">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-[#00000014]">
              <th className="text-left text-lg font-medium text-[#272727] px-5 py-3 w-[30%]">Name</th>
              <th className="text-center text-lg font-medium text-[#272727] px-4 py-3 w-[20%]">Mail</th>
              <th className="text-center text-lg font-medium text-[#272727] px-4 py-3 w-[15%]">Amount</th>
              <th className="text-center text-lg font-medium text-[#272727] px-4 py-3 w-[20%]">Campaign Title</th>
              <th className="text-center text-lg font-medium text-[#272727] px-4 py-3 w-[15%]">Date</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <>
                {Array.from({ length: 6 }).map((_, i) => (
                  <DonationRowSkeleton key={i} />
                ))}
              </>
            ) : donations.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">
                  No donations found
                </td>
              </tr>
            ) : (
              donations.map((donation, index) => (
                <tr
                  key={donation._id}
                  className={` ${
                    index !== donations.length - 1 ? "border-b border-[#00000014]" : ""
                  }`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {/* You can keep avatar if you have student profile pic later */}
                      {/* <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                        <Image src={...} alt="" fill className="object-cover" />
                      </div> */}
                      <span className="text-base text-gray-600 truncate">
                        {donation.donor.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-2.5 text-center text-base text-gray-600 truncate">
                    {donation.donor.email}
                  </td>

                  <td className="px-4 py-2.5 text-center text-base text-gray-600">
                    ${donation.amount}
                  </td>

                  <td className="px-4 py-2.5 text-center text-base text-gray-600 truncate">
                    {donation.campaignId?.name ?? "General Donation"}
                  </td>

                  <td className="px-4 py-2.5 text-center text-base text-gray-600">
                    {formatDate(donation.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="mt-3 flex items-center justify-between rounded-[6px] bg-[#F2F2F2] px-5 py-3">
        <p className="text-base font-medium text-[#6B6B6B]">
          Showing {from} to {to} of {total} results
        </p>

        <Pagination className="mx-0 w-auto justify-end">
          <PaginationContent className="gap-2">
            <PaginationItem>
              <PaginationLink
                href="#"
                className={
                  currentPage <= 1
                    ? "h-9 w-9 rounded-[4px] border border-[#D4D4D4] bg-[#EBEBEB] text-[#B9B9B9] hover:bg-[#EBEBEB]"
                    : "h-9 w-9 rounded-[4px] border border-[#0A33FF] bg-white text-[#0A33FF] hover:bg-[#F7F9FF]"
                }
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setPage(currentPage - 1);
                }}
                aria-disabled={currentPage <= 1}
              >
                ‹
              </PaginationLink>
            </PaginationItem>

            {pageItems.map((item, idx) => (
              <PaginationItem key={`${item}-${idx}`}>
                {item === "ellipsis" ? (
                  <span className="flex h-9 w-9 items-center justify-center rounded-[4px] border border-[#0A33FF] bg-white text-base font-medium leading-none text-[#0A33FF]">
                    ...
                  </span>
                ) : (
                  <PaginationLink
                    href="#"
                    isActive={item === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(item);
                    }}
                    className={
                      item === currentPage
                        ? "h-9 w-9 rounded-[4px] border border-[#0A33FF] bg-[#0A33FF] text-base font-medium text-white hover:bg-[#0A33FF]"
                        : "h-9 w-9 rounded-[4px] border border-[#0A33FF] bg-white text-base font-medium text-[#0A33FF] hover:bg-[#F7F9FF]"
                    }
                  >
                    {item}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationLink
                href="#"
                className={
                  currentPage >= totalPages
                    ? "h-9 w-9 rounded-[4px] border border-[#D4D4D4] bg-[#EBEBEB] text-[#B9B9B9] hover:bg-[#EBEBEB]"
                    : "h-9 w-9 rounded-[4px] border border-[#0A33FF] bg-white text-[#0A33FF] hover:bg-[#F7F9FF]"
                }
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setPage(currentPage + 1);
                }}
                aria-disabled={currentPage >= totalPages}
              >
                ›
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
