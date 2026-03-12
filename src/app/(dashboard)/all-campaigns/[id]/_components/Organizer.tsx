"use client";

import React, { useState } from "react";
import { Campaign } from "./Campaign";

function LetterAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-[101px] h-[101px] rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
      <span className="text-blue-600 text-[28px] font-bold">{initials}</span>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

interface DonorDetail {
  name: string;
  email: string;
  mobile: string;
  country: string;
  city: string;
  amount: number;
}

function DonorModal({
  donor,
  onClose,
}: {
  donor: DonorDetail;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[28px] font-bold text-gray-900">Donor Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-[28px] leading-none cursor-pointer bg-transparent border-none"
          >
            ✕
          </button>
        </div>

        {/* Avatar + Name */}
        <div className="flex items-center gap-4 mb-6">
          <LetterAvatar name={donor.name} />
          <p className="text-[24px] font-semibold text-gray-900">{donor.name}</p>
        </div>

        {/* Details */}
        <div className="space-y-3 text-[18px] text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Email</span>
            <span className="font-medium">{donor.email}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Mobile</span>
            <span className="font-medium">{donor.mobile}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Country</span>
            <span className="font-medium">{donor.country}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">City</span>
            <span className="font-medium">{donor.city}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-gray-500 font-semibold">Amount</span>
            <span className="font-bold text-gray-900">
              $ {donor.amount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DonorRow ─────────────────────────────────────────────────────────────────

function DonorRow({
  name,
  date,
  amount,
  onViewDetails,
}: {
  name: string;
  date: string;
  amount: number;
  onViewDetails: () => void;
}) {
  return (
    <div className="flex items-center gap-3 border border-[#ACACAC] rounded-[4px] px-4 h-[153px]">
      <LetterAvatar name={name} />
      <div className="flex-1 min-w-0">
        <p className="text-[32px] font-medium text-gray-900 leading-[150%]">{name}</p>
        <p className="text-[20px] font-normal text-gray-400 mt-0.5">{date}</p>
      </div>
      <button
        onClick={onViewDetails}
        className="text-[24px] text-gray-600 border border-gray-300 rounded px-3 py-1.5 hover:bg-gray-50 transition-colors flex-shrink-0 cursor-pointer"
      >
        View Details
      </button>
      <span className="text-[32px] font-medium leading-[150%] text-gray-900">
        $ {amount.toLocaleString()}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface Props {
  campaign: Campaign;
}

function Organizer({ campaign }: Props) {
  const [selectedDonor, setSelectedDonor] = useState<DonorDetail | null>(null);

  const studentDonations = campaign.studentDonations ?? [];
  const guestDonations = campaign.guestDonations ?? [];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleViewDetails = (donation: (typeof studentDonations)[0]) => {
    setSelectedDonor({
      name: donation.donor.name,
      email: donation.donor.email,
      mobile: donation.donor.mobile,
      country: donation.donor.country,
      city: donation.donor.city,
      amount: donation.amount,
    });
  };

  return (
    <div className="min-h-screen px-4 py-6 font-sans">
      {/* Modal */}
      {selectedDonor && (
        <DonorModal
          donor={selectedDonor}
          onClose={() => setSelectedDonor(null)}
        />
      )}

      <div className="space-y-6">

        {/* ===== ORGANIZER ===== */}
        <section>
          <h2 className="text-[48px] font-bold text-gray-900 leading-[150%] mb-3">
            Organizer
          </h2>
          <div className="flex items-center gap-10 border border-[#ACACAC] rounded-[4px] px-4 h-[191px]">
            <LetterAvatar name={campaign.createdBy.name} />
            <p className="text-[32px] leading-[150%] font-medium text-gray-900">
              {campaign.createdBy.name}
            </p>
          </div>
        </section>

        {/* ===== STUDENT DONATIONS ===== */}
        <section>
          <h2 className="text-[48px] font-bold text-gray-900 leading-[150%] mb-3">
            Student Donations({studentDonations.length})
          </h2>
          <div className="space-y-6">
            {studentDonations.length === 0 ? (
              <p className="text-gray-400 text-[20px]">No student donations yet.</p>
            ) : (
              studentDonations.map((donation) => (
                <DonorRow
                  key={donation._id}
                  name={donation.donor.name}
                  date={formatDate(donation.createdAt)}
                  amount={donation.amount}
                  onViewDetails={() => handleViewDetails(donation)}
                />
              ))
            )}
          </div>
        </section>

        {/* ===== GUEST DONATIONS ===== */}
        <section>
          <h2 className="text-[48px] font-bold text-gray-900 leading-[150%] mb-3">
            Guest Donations({guestDonations.length})
          </h2>
          <div className="space-y-6">
            {guestDonations.length === 0 ? (
              <p className="text-gray-400 text-[20px]">No guest donations yet.</p>
            ) : (
              guestDonations.map((donation) => (
                <DonorRow
                  key={donation._id}
                  name={donation.donor.name}
                  date={formatDate(donation.createdAt)}
                  amount={donation.amount}
                  onViewDetails={() => handleViewDetails(donation)}
                />
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

export default Organizer;