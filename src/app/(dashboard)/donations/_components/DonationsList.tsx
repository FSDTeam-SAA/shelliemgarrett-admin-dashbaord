"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSession } from "next-auth/react";

// ── Types ──────────────────────────────────────────────
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

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

// ── Avatar ─────────────────────────────────────────────
function DonorAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="w-10 h-10 rounded-full flex-shrink-0 bg-blue-100 flex items-center justify-center">
      <span className="text-sm font-semibold text-blue-600">{initials}</span>
    </div>
  );
}

// ── Skeleton Row ───────────────────────────────────────
function SkeletonRow() {
  return (
    <tr className="border-b border-[#00000014]">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
          <div className="h-3.5 w-32 bg-gray-200 animate-pulse rounded" />
        </div>
      </td>
      <td className="px-4 py-4 text-center">
        <div className="h-3.5 w-40 bg-gray-200 animate-pulse rounded mx-auto" />
      </td>
      <td className="px-4 py-4 text-center">
        <div className="h-3.5 w-16 bg-gray-200 animate-pulse rounded mx-auto" />
      </td>
      <td className="px-4 py-4 text-center">
        <div className="h-3.5 w-28 bg-gray-200 animate-pulse rounded mx-auto" />
      </td>
      <td className="px-4 py-4 text-center">
        <div className="h-3.5 w-20 bg-gray-200 animate-pulse rounded mx-auto" />
      </td>
    </tr>
  );
}

// ── Pagination helper ──────────────────────────────────
function getPageNumbers(page: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | "...")[] = [1];
  if (page > 3) pages.push("...");
  for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
    pages.push(i);
  }
  if (page < totalPages - 2) pages.push("...");
  pages.push(totalPages);
  return pages;
}

// ── Main Component ─────────────────────────────────────
export default function DonationsList() {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useQuery<DonationsResponse, Error>({
    queryKey: ["donations", token, page, limit],
    enabled: !!token,
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/donation?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          cache: "no-store",
        }
      );
      if (!res.ok) throw new Error("Failed to fetch donations");
      return res.json();
    },
    staleTime: 3 * 60 * 1000,
  });

  const donations = data?.data.donations ?? [];
  const pagination = data?.data.pagination;
  const total = pagination?.total ?? 0;
  const currentPage = pagination?.page ?? page;
  const totalPages = pagination?.totalPages ?? 1;
  const from = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const to = total === 0 ? 0 : Math.min(currentPage * limit, total);

  const formatDate = (isoString: string) =>
    new Date(isoString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-center relative mb-5">
        <h1 className="text-center text-[48px] font-medium leading-[150%] my-8">Donations</h1>
        {/* <button className="absolute right-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer">
          Save <SaveIcon />
        </button> */}
      </div>

      {/* Table Card */}
      <div className="rounded-xl overflow-hidden border border-[#00000014]">
        <table className="w-full">
          {/* Head */}
          <thead>
            <tr className="border-b border-[#00000014]">
              <th className="text-left text-sm font-semibold text-gray-600 px-5 py-4 w-[25%]">
                Name
              </th>
              <th className="text-center text-sm font-semibold text-gray-600 px-4 py-4 w-[25%]">
                Mail
              </th>
              <th className="text-center text-sm font-semibold text-gray-600 px-4 py-4 w-[12%]">
                Amount
              </th>
              <th className="text-center text-sm font-semibold text-gray-600 px-4 py-4 w-[23%]">
                Campaign Title
              </th>
              <th className="text-center text-sm font-semibold text-gray-600 px-4 py-4 w-[15%]">
                Date
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
            ) : isError ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-base text-red-500">
                  Failed to load donations. Please try again.
                </td>
              </tr>
            ) : donations.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-base text-gray-400">
                  No donations found.
                </td>
              </tr>
            ) : (
              donations.map((donation, index) => (
                <tr
                  key={donation._id}
                  className={`hover:bg-gray-50 transition-colors ${
                    index !== donations.length - 1 ? "border-b border-[#00000014]" : ""
                  }`}
                >
                  {/* Name + Avatar */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <DonorAvatar name={donation.donor.name} />
                      <span className="text-base text-gray-800 font-medium truncate">
                        {donation.donor.name}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-4 py-4 text-center text-base text-gray-600 truncate">
                    {donation.donor.email}
                  </td>

                  {/* Amount */}
                  <td className="px-4 py-4 text-center text-base text-gray-600">
                    ${donation.amount.toLocaleString()}
                  </td>

                  {/* Campaign */}
                  <td className="px-4 py-4 text-center text-base text-gray-600 truncate">
                    {donation.campaignId?.name ?? "General Donation"}
                  </td>

                  {/* Date */}
                  <td className="px-4 py-4 text-center text-base text-gray-600">
                    {formatDate(donation.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-[#00000014]">
          <p className="text-sm text-gray-500">
            {total === 0
              ? "No results"
              : `Showing ${from} to ${to} of ${total} results`}
          </p>

          <div className="flex items-center gap-1.5">
            {/* Prev */}
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded border border-gray-200 bg-[#A8A8A8] text-black hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <ChevronLeft />
            </button>

            {/* Page numbers */}
            {getPageNumbers(currentPage, totalPages).map((p, i) =>
              p === "..." ? (
                <span
                  key={`dots-${i}`}
                  className="w-9 h-9 flex items-center justify-center text-sm text-gray-400 select-none"
                >
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p as number)}
                  className={`w-10 h-10 flex items-center justify-center text-sm font-semibold cursor-pointer transition-all ${
                    currentPage === p
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 shadow-sm"
                  }`}
                >
                  {p}
                </button>
              )
            )}

            {/* Next */}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="w-10 h-10 flex items-center justify-center rounded border border-gray-200 bg-[#A8A8A8] text-black hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}