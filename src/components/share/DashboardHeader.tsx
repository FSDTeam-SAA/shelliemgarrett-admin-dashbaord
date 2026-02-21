// components/DashboardHeader.tsx
import Link from "next/link";
import React from "react";

function DashboardHeader() {
  return (
    <div className="border-blue-100">
      {/* Main header container */}
      <div className="">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left side - Overview title + Dashboard link */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Over View</h1>
            <div className="mt-1 flex items-center gap-4">
              <span className="text-sm pb-1">Dashboard</span>
              {/* অন্য কোনো tab থাকলে এখানে যোগ করতে পারেন */}
            </div>
          </div>

          {/* Right side - Add Campaign button */}
          <Link href="/add-campaign">
            <button className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              Add Campaign +
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
