"use client";

import React from "react";
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

// ─── DonorRow ─────────────────────────────────────────────────────────────────

function DonorRow({
  name,
  date,
  amount,
}: {
  name: string;
  date: string;
  amount: number;
}) {
  return (
    <div className="flex items-center gap-3 border border-[#ACACAC] rounded-[4px] px-4 h-[153px]">
      {/* Avatar */}
      <LetterAvatar name={name} />

      {/* Name + Date */}
      <div className="flex-1 min-w-0">
        <p className="text-[32px] font-medium text-gray-900 leading-[150%]">{name}</p>
        <p className="text-[20px] font-normal text-gray-400 mt-0.5">{date}</p>
      </div>

      {/* View Details Button */}
      <button className="text-[24px] text-gray-600 border border-gray-300 rounded px-3 py-1.5 hover:bg-gray-50 transition-colors flex-shrink-0 cursor-pointer">
        View Details
      </button>

      {/* Amount */}
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
  // All students
  const studentDonors = campaign.students;
  return (
    <div className="min-h-screen px-4 py-6 font-sans">
      <div className="space-y-6">

        {/* ===== ORGANIZER ===== */}
        <section>
          <h2 className="text-[48px] font-bold text-gray-900 leading-[150%] mb-3">Organizer</h2>
          <div className="flex items-center gap-10 border border-[#ACACAC] rounded-[4px] px-4 h-[191px]">
            <LetterAvatar name={campaign.createdBy.name} />
            <p className="text-[32px] leading-[150%] font-medium text-gray-900">
              {campaign.createdBy.name}
            </p>
          </div>
        </section>

        {/* ===== STUDENT DONORS ===== */}
        <section>
          <h2 className="text-[48px] font-bold text-gray-900 leading-[150%] mb-3">
            Student Donors ({studentDonors.length})
          </h2>
          <div className="space-y-6">
            {studentDonors.length === 0 ? (
              <p className="text-gray-400 text-[20px]">No student donors yet.</p>
            ) : (
              studentDonors.map((student) => (
                <DonorRow
                  key={student.studentId}
                  name={student.name}
                  date={student.email}
                  amount={student.raisedAmount}
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