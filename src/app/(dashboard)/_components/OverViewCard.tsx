import Image from "next/image";
import React from "react";

function OverViewCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-6">
      {/* Total Donation */}
      <div className="bg-white rounded-[6px] border border-gray-200 p-5 flex items-center justify-between shadow-[0px_2px_6px_0px_#00000014]">
        {/* Left Content */}
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">
            Total Donation
          </p>
          <p className="text-3xl font-bold text-gray-900">12,570</p>
        </div>

        {/* Right Image */}
        <div className="w-14 h-14 relative">
          <Image
            src="/images/cardImage1.png"
            alt="Total Donation"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Total Campaigns */}
      <div className="bg-white rounded-[6px] border border-gray-200 p-5 flex items-center justify-between shadow-[0px_2px_6px_0px_#00000014]">
        {/* Left Content */}
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">
            Total Campaigns
          </p>
          <p className="text-3xl font-bold text-gray-900">24</p>
        </div>

        {/* Right Image */}
        <div className="w-14 h-14 relative">
          <Image
            src="/images/cardImage2.png"
            alt="Total Donation"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Total Donors */}
      <div className="bg-white rounded-[6px] border border-gray-200 p-5 flex items-center justify-between shadow-[0px_2px_6px_0px_#00000014]">
        {/* Left Content */}
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">
            Total Donors
          </p>
          <p className="text-3xl font-bold text-gray-900">270</p>
        </div>

        {/* Right Image */}
        <div className="w-14 h-14 relative">
          <Image
            src="/images/cardImage3.png"
            alt="Total Donation"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Guest Users */}
      <div className="bg-white rounded-[6px] border border-gray-200 p-5 flex items-center justify-between shadow-[0px_2px_6px_0px_#00000014]">
        {/* Left Content */}
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">
            Guest Users
          </p>
          <p className="text-3xl font-bold text-gray-900">70</p>
        </div>

        {/* Right Image */}
        <div className="w-14 h-14 relative">
          <Image
            src="/images/cardImage4.png"
            alt="Total Donation"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default OverViewCard;
