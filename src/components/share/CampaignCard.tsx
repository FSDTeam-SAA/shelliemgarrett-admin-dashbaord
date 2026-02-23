import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CampaignCardProps {
  image: string;
  badge?: string;
  title: string;
  description: string;
  amount: string;
  id?: string;
  goalAmount?: string;
  onViewDetails?: () => void;
}

export function CampaignCard({
  image,
  badge,
  title,
  description,
  amount,
  id,
  goalAmount,
}: CampaignCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="relative w-full h-[257px] bg-gray-200 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover w-full h-full"
        />
        {badge && (
          <div className="absolute top-4 right-4 bg-white text-gray-900 text-xs font-semibold px-3 py-1 rounded">
            {badge}
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

        <div className="mb-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-[#7DBAED]" style={{ width: "45%" }} />
          </div>
          <p className="text-sm font-semibold text-gray-900">{amount}</p>
          {goalAmount && (
            <p className="text-xs text-gray-500">Raise goal {goalAmount}</p>
          )}
        </div>

        <Link href={`/all-campaigns/${id}`}>
          <button
            className="w-full border-2 border-gray-300 text-gray-900 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
