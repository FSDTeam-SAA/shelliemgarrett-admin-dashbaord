// "use client"; // client component কারণ gallery interactive

// import Image from "next/image";
// import React, { useState } from "react";
// import ImageGallery from "react-image-gallery";
// import "react-image-gallery/styles/css/image-gallery.css"; // default styles import করো

// function CampaignDetailsImage() {
//   const [showMore, setShowMore] = useState(false);

//   // Gallery items — main image + thumbnails একসাথে handle করে gallery
//   const galleryItems = [
//     {
//       original: "/images/main-campaign.jpg", // তোমার main large image path
//       thumbnail: "/images/carosalImage1.jpg",
//       originalAlt: "Child in hospital with cleft condition",
//       thumbnailAlt: "Thumbnail 1",
//       description: "Bringing health to those who need it most",
//     },
//     {
//       original: "/images/carosalImage2.jpg",
//       thumbnail: "/images/carosalImage1.jpg",
//       originalAlt: "Campaign image 2",
//       thumbnailAlt: "Thumbnail 2",
//     },
//     {
//       original: "/images/carosalImage3.jpg",
//       thumbnail: "/images/carosalImage1.jpg",
//       originalAlt: "Campaign image 3",
//       thumbnailAlt: "Thumbnail 3",
//     },
//     {
//       original: "/images/carosalImage4.jpg",
//       thumbnail: "/images/carosalImage1.jpg",
//       originalAlt: "Campaign image 4",
//       thumbnailAlt: "Thumbnail 4",
//     },
//     {
//       original: "/images/carosalImage5.jpg",
//       thumbnail: "/images/carosalImage1.jpg",
//       originalAlt: "Campaign image 5",
//       thumbnailAlt: "Thumbnail 5",
//     },
//     {
//       original: "/images/carosalImage6.jpg",
//       thumbnail: "/images/carosalImage1.jpg",
//       originalAlt: "Campaign image 6",
//       thumbnailAlt: "Thumbnail 6",
//     },
//   ];

//   return (
//     <div className="bg-white min-h-screen">
//       {/* Header */}
//       <div className="bg-blue-50 border-b border-blue-100 px-6 py-5 flex items-center justify-between">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
//           Campaign Details
//         </h1>
//         <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">
//           Edit Campaign
//         </button>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
//         {/* Image Gallery with thumbnails & arrows */}
//         <div className="mb-8 rounded-xl overflow-hidden shadow-md">
//           <ImageGallery
//             items={galleryItems}
//             showThumbnails={true}
//             thumbnailPosition="bottom" // thumbnails নিচে
//             showFullscreenButton={true}
//             showPlayButton={false} // autoplay off রাখলাম
//             autoPlay={false}
//             slideInterval={5000} // যদি play চালু করো
//             lazyLoad={true}
//             showNav={true} // left/right arrows
//             showBullets={false} // bullets না দেখানো
//             renderItem={(item) => (
//               <div className="w-full">
//                 <Image
//                 width={300}
//                 height={300}
//                   src={item.original}
//                   alt={item.originalAlt ?? "Campaign image"}
//                   className="w-full h-auto max-h-[500px] object-cover rounded-xl"
//                 />
//               </div>
//             )}
//           />
//         </div>

//         {/* Raised amount */}
//         <div className="mb-8">
//           <p className="text-sm text-gray-600">Raised so far</p>
//           <p className="text-4xl md:text-5xl font-bold text-green-700">
//             US$68,543
//           </p>
//         </div>

//         {/* Description with Show more */}
//         <div className="prose prose-lg max-w-none text-gray-800 mb-8">
//           <p>
//             Happy New Year friends! With my birthday coming up on January 6th,
//             as is yearly tradition, instead of asking for gifts I instead
//             encourage my family, friends and supporters to give the gift of a
//             smile to Filipino children with cleft.
//           </p>

//           {showMore && (
//             <>
//               <p>
//                 Working alongside Smile Train for 7 years (6 years of them as their
//                 Global Ambassador), Ive witnessed their work over 90+
//                 countries worldwide. The ongoing work they do for surgeries, medical
//                 support and assistance for individuals with cleft lip/palate is
//                 truly inspiring.
//               </p>
//               <p>
//                 Last year, the funds raised through my Smile Train Philippines
//                 birthday fundraiser, in addition to my personal donation, raised
//                 over...
//               </p>
//             </>
//           )}

//           <button
//             onClick={() => setShowMore(!showMore)}
//             className="text-blue-600 font-medium hover:underline flex items-center gap-1 mt-2"
//           >
//             {showMore ? "Show less ↑" : "Show more ↓"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CampaignDetailsImage;