"use client";

import Image from "next/image";
import React, { useState } from "react";

const galleryItems = [
  {
    original: "/images/main-campaign.jpg",
    thumbnail: "/images/carosalImage1.jpg",
    originalAlt: "Child in hospital with cleft condition",
    thumbnailAlt: "Thumbnail 1",
  },
  {
    original: "/images/carosalImage2.jpg",
    thumbnail: "/images/carosalImage2.jpg",
    originalAlt: "Campaign image 2",
    thumbnailAlt: "Thumbnail 2",
  },
  {
    original: "/images/carosalImage3.jpg",
    thumbnail: "/images/carosalImage3.jpg",
    originalAlt: "Campaign image 3",
    thumbnailAlt: "Thumbnail 3",
  },
  {
    original: "/images/carosalImage4.jpg",
    thumbnail: "/images/carosalImage4.jpg",
    originalAlt: "Campaign image 4",
    thumbnailAlt: "Thumbnail 4",
  },
  {
    original: "/images/carosalImage5.jpg",
    thumbnail: "/images/carosalImage5.jpg",
    originalAlt: "Campaign image 5",
    thumbnailAlt: "Thumbnail 5",
  },
  {
    original: "/images/carosalImage6.jpg",
    thumbnail: "/images/carosalImage6.jpg",
    originalAlt: "Campaign image 6",
    thumbnailAlt: "Thumbnail 6",
  },
];

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

function CampaignDetailsImage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const VISIBLE_THUMBNAILS = 5;

  const goTo = (index: number) => {
    if (index < 0) index = galleryItems.length - 1;
    if (index >= galleryItems.length) index = 0;
    setCurrentIndex(index);
  };

  const startThumb = Math.max(
    0,
    Math.min(
      currentIndex - Math.floor(VISIBLE_THUMBNAILS / 2),
      galleryItems.length - VISIBLE_THUMBNAILS
    )
  );
  const visibleThumbs = galleryItems.slice(
    startThumb,
    startThumb + VISIBLE_THUMBNAILS
  );

  return (
    <div className="min-h-screen font-sans">

      {/* ===== GALLERY SECTION ===== */}
      <div className="bg-white">

        {/* Main Image */}
        <div className="relative w-full bg-gray-200" style={{ aspectRatio: "16/7" }}>
          <Image
            src={galleryItems[currentIndex].original}
            alt={galleryItems[currentIndex].originalAlt}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Thumbnail Row */}
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
      </div>

      {/* ===== CONTENT SECTION ===== */}
      <div className="bg-white mt-2 px-5 py-6">

        {/* Title + Amount Row */}
        <div className="flex justify-between items-start gap-3 flex-wrap mb-5">
          <h2 className="text-xl font-bold text-gray-900 leading-snug flex-1 min-w-[200px] m-0">
            Bringing health to those who need it most
          </h2>
          <span className="text-xl font-bold text-gray-900 whitespace-nowrap">
            US$ 68543
          </span>
        </div>

        {/* Divider */}
        <hr className="border-none border-t border-gray-100 mb-4" />

        {/* Description */}
        <div className="text-gray-700 text-[15px] leading-relaxed">
          <p className="mb-3.5">
            Happy New Year friends! With my birthday coming up on January 6th,
            as is yearly tradition, instead of asking for gifts I instead
            encourage my family, friends and supporters to give the gift of a
            smile to Filipino children with cleft.
          </p>

          {showMore && (
            <>
              <p className="mb-3.5">
                Working alongside Smile Train for 7 years now (6 years of them
                as their Global Ambassador), I&apos;ve witnessed their work in
                over 7 countries first hand — a testament to the ongoing work
                they do for surgeries, medical support and assistance for
                individuals with cleft lip in over 90 countries world wide.
              </p>
              <p className="mb-3.5 text-gray-500">
                Last year, the funds raised through my Smile Train Philippines
                birthday fundraiser, in addition to my personal donation, we
                raised over...
              </p>
            </>
          )}

          <button
            onClick={() => setShowMore(!showMore)}
            className="bg-transparent border-none p-0 text-blue-600 text-[15px] font-medium cursor-pointer flex items-center gap-1 mt-1 hover:underline"
          >
            {showMore ? "Show less ↑" : "Show more ↓"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CampaignDetailsImage;