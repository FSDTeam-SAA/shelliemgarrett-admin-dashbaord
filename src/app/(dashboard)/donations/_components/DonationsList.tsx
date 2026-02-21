"use client";

import Image from "next/image";

const students = [
  {
    id: 1,
    name: "Cameron Williamson",
    email: "cameron@gmail.com",
    amount: 250,
    campaignTitle: "Winter Donation",
    date: "12 Jan 2026",
    avatar: "/images/carosalImage1.jpg",
  },
  {
    id: 2,
    name: "Jacob Jones",
    email: "jacob@gmail.com",
    amount: 150,
    campaignTitle: "Food Drive",
    date: "15 Jan 2026",
    avatar: "/images/carosalImage2.jpg",
  },
  {
    id: 3,
    name: "Arlene McCoy",
    email: "arlene@gmail.com",
    amount: 320,
    campaignTitle: "Education Fund",
    date: "18 Jan 2026",
    avatar: "/images/carosalImage3.jpg",
  },
  {
    id: 4,
    name: "Devon Lane",
    email: "devon@gmail.com",
    amount: 200,
    campaignTitle: "Medical Support",
    date: "20 Jan 2026",
    avatar: "/images/carosalImage4.jpg",
  },
  {
    id: 5,
    name: "Cody Fisher",
    email: "cody@gmail.com",
    amount: 180,
    campaignTitle: "Flood Relief",
    date: "22 Jan 2026",
    avatar: "/images/carosalImage5.jpg",
  },
];

function SaveIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
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

export default function DonationsList() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-center relative mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Donations</h1>
        <button className="absolute right-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer">
          Save <SaveIcon />
        </button>
      </div>

      {/* Table Card */}
      <div className="rounded-xl overflow-hidden border border-[#00000014]">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-[#00000014]">
              <th className="text-left text-xs font-medium text-gray-500 px-5 py-3 w-[30%]">
                Name
              </th>
              <th className="text-center text-xs font-medium text-gray-500 px-4 py-3 w-[20%]">
                Mail
              </th>
              <th className="text-center text-xs font-medium text-gray-500 px-4 py-3 w-[15%]">
                Amount
              </th>
              <th className="text-center text-xs font-medium text-gray-500 px-4 py-3 w-[20%]">
                Campaign Title
              </th>
              <th className="text-center text-xs font-medium text-gray-500 px-4 py-3 w-[15%]">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {students.map((student, index) => (
              <tr
                key={student.id}
                className={`hover:bg-gray-50 transition-colors ${
                  index !== students.length - 1
                    ? "border-b border-[#00000014]"
                    : ""
                }`}
              >
                <td className="px-5 py-2.5">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                      <Image
                        src={student.avatar}
                        alt={student.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm text-gray-800 truncate">
                      {student.name}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-2.5 text-center text-sm text-gray-600 truncate">
                  {student.email}
                </td>

                <td className="px-4 py-2.5 text-center text-sm text-gray-600">
                  ${student.amount}
                </td>

                <td className="px-4 py-2.5 text-center text-sm text-gray-600 truncate">
                  {student.campaignTitle}
                </td>

                <td className="px-4 py-2.5 text-center text-sm text-gray-600">
                  {student.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Showing 1 to {students.length} of {students.length} results
          </p>

          <div className="flex items-center gap-1">
            <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-400 hover:bg-gray-50 cursor-pointer transition-colors">
              <ChevronLeft />
            </button>

            <button className="w-7 h-7 flex items-center justify-center rounded text-xs font-semibold bg-blue-600 text-white cursor-pointer">
              1
            </button>

            <button className="w-7 h-7 flex items-center justify-center rounded text-xs text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors">
              2
            </button>

            <button className="w-7 h-7 flex items-center justify-center rounded text-xs text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors">
              3
            </button>

            <span className="w-7 h-7 flex items-center justify-center text-xs text-gray-400 select-none">
              ...
            </span>

            <button className="w-7 h-7 flex items-center justify-center rounded text-xs text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors">
              8
            </button>

            <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-400 hover:bg-gray-50 cursor-pointer transition-colors">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}