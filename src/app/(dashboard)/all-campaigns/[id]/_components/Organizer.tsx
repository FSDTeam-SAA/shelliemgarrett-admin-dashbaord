"use client";

import Image from "next/image";
import React from "react";

const organizer = {
  name: "Steve Rogers",
  avatar: "/images/carosalImage1.jpg",
};

const studentDonors = [
  { id: 1, name: "Steve Adam", date: "December 21, 2019", amount: 12, avatar: "/images/carosalImage1.jpg" },
  { id: 2, name: "Guest", date: "December 21, 2019", amount: 12, avatar: "/images/carosalImage2.jpg" },
  { id: 3, name: "Abigail", date: "December 21, 2019", amount: 12, avatar: "/images/carosalImage3.jpg" },
  { id: 4, name: "Steve Adam", date: "December 21, 2019", amount: 12, avatar: "/images/carosalImage4.jpg" },
  { id: 5, name: "Guest", date: "December 21, 2019", amount: 12, avatar: "/images/carosalImage5.jpg" },
  { id: 6, name: "Abigail", date: "December 21, 2019", amount: 12, avatar: "/images/carosalImage6.jpg" },
];

const guestDonors = [
  { id: 1, name: "Steve Adam", date: "December 21, 2019", amount: 312, avatar: "/images/carosalImage1.jpg" },
  { id: 2, name: "Guest", date: "December 21, 2019", amount: 300, avatar: "/images/carosalImage2.jpg" },
  { id: 3, name: "Abigail", date: "December 21, 2019", amount: 282, avatar: "/images/carosalImage3.jpg" },
];

function DonorRow({ name, date, amount, avatar }: { name: string; date: string; amount: number; avatar: string }) {
  return (
    <div className="flex items-center gap-3 border border-[#ACACAC] rounded-[4px] px-4 h-[153px]">
      {/* Avatar */}
      <div className="relative w-[101px] h-[101px] rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
        <Image src={avatar} alt={name} fill className="object-cover" />
      </div>

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
      <span className="text-[32px] font-medium leading-[150%] text-gray-900 ">
        $ {amount}
      </span>
    </div>
  );
}

function Organizer() {
  return (
    <div className="min-h-screen px-4 py-6 font-sans">
      <div className="space-y-6">

        {/* ===== ORGANIZER ===== */}
        <section>
          <h2 className="text-[48px] font-bold text-gray-900 leading-[150%] mb-3">Organizer</h2>
          <div className="flex items-center gap-10  border border-[#ACACAC] rounded-[4px] px-4 h-[191px]">
            <div className="relative w-[101px] h-[101px] rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
              <Image src={organizer.avatar} alt={organizer.name} fill className="object-cover" />
            </div>
            <p className="text-[32px] leading-[150%] font-medium text-gray-900">{organizer.name}</p>
          </div>
        </section>

        {/* ===== STUDENT DONORS ===== */}
        <section>
          <h2 className="text-[48px] font-bold text-gray-900 leading-[150%] mb-3">
            Student Donors ({studentDonors.length})
          </h2>
          <div className="space-y-6">
            {studentDonors.map((donor) => (
              <DonorRow
                key={donor.id}
                name={donor.name}
                date={donor.date}
                amount={donor.amount}
                avatar={donor.avatar}
              />
            ))}
          </div>
        </section>

        {/* ===== GUEST DONORS ===== */}
        <section>
          <h2 className="text-[48px] font-bold text-gray-900 leading-[150%] mb-3">
            Guest Donors ({guestDonors.length})
          </h2>
          <div className="space-y-6">
            {guestDonors.map((donor) => (
              <DonorRow
                key={donor.id}
                name={donor.name}
                date={donor.date}
                amount={donor.amount}
                avatar={donor.avatar}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

export default Organizer;