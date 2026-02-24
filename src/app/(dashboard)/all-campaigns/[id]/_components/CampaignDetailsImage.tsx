"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Campaign } from "./Campaign";

function ChevronLeft() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

interface Props {
  campaign: Campaign;
}

function CampaignDetailsImage({ campaign }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const VISIBLE_THUMBNAILS = 5;

  // Build gallery items from API media array
  const galleryItems =
    campaign.media && campaign.media.length > 0
      ? campaign.media.map((item) => ({
          original: item.url,
          thumbnail: item.url,
          originalAlt: campaign.name,
          thumbnailAlt: campaign.name,
        }))
      : [];

  const goTo = (index: number) => {
    if (galleryItems.length === 0) return;
    if (index < 0) index = galleryItems.length - 1;
    if (index >= galleryItems.length) index = 0;
    setCurrentIndex(index);
  };

  const startThumb = Math.max(
    0,
    Math.min(
      currentIndex - Math.floor(VISIBLE_THUMBNAILS / 2),
      Math.max(0, galleryItems.length - VISIBLE_THUMBNAILS),
    ),
  );
  const visibleThumbs = galleryItems.slice(
    startThumb,
    startThumb + VISIBLE_THUMBNAILS,
  );

  return (
    <div className="min-h-screen font-sans">
      {/* ===== GALLERY SECTION ===== */}
      <div className="bg-white">
        {/* Main Image */}
        {galleryItems.length > 0 && (
          <div
            className="relative w-full bg-gray-200"
            style={{ aspectRatio: "16/7" }}
          >
            <Image
              src={galleryItems[currentIndex].original}
              alt={galleryItems[currentIndex].originalAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Thumbnail Row — only show if more than 1 image */}
        {galleryItems.length > 1 && (
          <div className="flex items-center justify-center gap-2.5 px-4 py-3 bg-white border-b border-gray-100">
            {/* Left Arrow */}
            <button
              onClick={() => goTo(currentIndex - 1)}
              aria-label="Previous image"
              className="w-[34px] h-[34px] rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 flex-shrink-0 cursor-pointer transition-colors"
            >
              <ChevronLeft />
            </button>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-hidden">
              {visibleThumbs.map((item, i) => {
                const actualIndex = startThumb + i;
                const isActive = actualIndex === currentIndex;
                return (
                  <button
                    key={actualIndex}
                    onClick={() => goTo(actualIndex)}
                    aria-label={item.thumbnailAlt}
                    className={`relative w-[110px] h-[74px] flex-shrink-0 rounded-md overflow-hidden cursor-pointer p-0 bg-gray-200 transition-all duration-200 ${
                      isActive
                        ? "border-[2.5px] border-blue-600 opacity-100"
                        : "border-[2.5px] border-transparent opacity-75 hover:opacity-90"
                    }`}
                  >
                    <Image
                      src={item.thumbnail}
                      alt={item.thumbnailAlt}
                      fill
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => goTo(currentIndex + 1)}
              aria-label="Next image"
              className="w-[34px] h-[34px] rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 flex-shrink-0 cursor-pointer transition-colors"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* ===== CONTENT SECTION ===== */}
      <div className="bg-white mt-2 px-5 py-6">
        {/* Title + Amount Row */}
        <div className="flex justify-between items-start gap-3 flex-wrap mb-5">
          <h2 className="text-xl font-bold text-gray-900 leading-snug flex-1 min-w-[200px] m-0">
            {campaign.name}
          </h2>
          <span className="text-xl font-bold text-gray-900 whitespace-nowrap">
            US$ {campaign.totalRaised.toLocaleString()}
          </span>
        </div>

        {/* Divider */}
        <hr className="border-none border-t border-gray-100 mb-4" />

        {/* Description */}
        <div className="text-gray-700 text-[15px] leading-relaxed">
          {campaign.description.length <= 150 ? (
            <p className="mb-3.5">{campaign.description}</p>
          ) : (
            <>
              <p className="mb-3.5">
                {showMore
                  ? campaign.description
                  : campaign.description.slice(0, 150) + "..."}
              </p>
              <button
                onClick={() => setShowMore(!showMore)}
                className="bg-transparent border-none p-0 text-blue-600 text-[15px] font-medium cursor-pointer flex items-center gap-1 mt-1 hover:underline"
              >
                {showMore ? "Show less ↑" : "Show more ↓"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CampaignDetailsImage;