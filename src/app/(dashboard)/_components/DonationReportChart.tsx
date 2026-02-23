"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// API response types
interface YearlyMonthData {
  year: number;
  months: Record<
    "jan" | "feb" | "mar" | "apr" | "may" | "jun" | "jul" | "aug" | "sep" | "oct" | "nov" | "dec",
    number
  >;
}

interface DonationReportResponse {
  status: boolean;
  message: string;
  data: {
    years: YearlyMonthData[];
  };
}

export function DonationReportChart() {
  const session = useSession();
  const TOKEN = session?.data?.user?.accessToken;

  const {
    data: donationReport,
    isLoading,
    isError,
    error,
  } = useQuery<DonationReportResponse>({
    queryKey: ["chartData"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/admin/donations`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch donation report");
      }

      return res.json();
    },
    enabled: !!TOKEN,
  });

  // Select first year by default
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // Update selectedYear when data loads
  React.useEffect(() => {
    if (donationReport?.data?.years?.length) {
      setSelectedYear(donationReport.data.years[0].year);
    }
  }, [donationReport]);

  // Map API response to recharts format based on selected year
  const chartData = useMemo(() => {
    if (isLoading || !donationReport?.data?.years?.length || !selectedYear) {
      return [
        { month: "JAN", thisYear: 0, lastYear: 0 },
        { month: "FEB", thisYear: 0, lastYear: 0 },
        { month: "MAR", thisYear: 0, lastYear: 0 },
        { month: "APR", thisYear: 0, lastYear: 0 },
        { month: "MAY", thisYear: 0, lastYear: 0 },
        { month: "JUN", thisYear: 0, lastYear: 0 },
        { month: "JUL", thisYear: 0, lastYear: 0 },
        { month: "AUG", thisYear: 0, lastYear: 0 },
        { month: "SEP", thisYear: 0, lastYear: 0 },
        { month: "OCT", thisYear: 0, lastYear: 0 },
        { month: "NOV", thisYear: 0, lastYear: 0 },
        { month: "DEC", thisYear: 0, lastYear: 0 },
      ];
    }

    const currentYearData = donationReport.data.years.find(
      (y) => y.year === selectedYear
    );
    const previousYearData = donationReport.data.years.find(
      (y) => y.year === selectedYear! - 1
    );

    const monthsOrder = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ] as const;

    return monthsOrder.map((m) => ({
      month: m.toUpperCase(),
      thisYear: currentYearData?.months[m] ?? 0,
      lastYear: previousYearData?.months[m] ?? 0,
    }));
  }, [donationReport, isLoading, selectedYear]);

  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Donation report</h2>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 text-sm mr-4">
            <div className="w-3 h-3 rounded-full border-2 border-blue-500" />
            <span className="text-gray-600">This year</span>
          </div>
          <div className="flex items-center gap-2 text-sm mr-4">
            <div className="w-3 h-3 rounded-full border-2 border-pink-400" />
            <span className="text-gray-600">Last year</span>
          </div>
        </div>

        {/* Year select buttons */}
        <div className="flex gap-2">
          {donationReport?.data?.years?.map((y) => (
            <button
              key={y.year}
              onClick={() => setSelectedYear(y.year)}
              className={`px-4 py-1 rounded text-sm font-medium transition-colors ${
                selectedYear === y.year
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {y.year}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#666", fontSize: 12 }}
            axisLine={{ stroke: "#e5e7eb" }}
          />
          <YAxis
            tick={{ fill: "#666", fontSize: 12 }}
            axisLine={{ stroke: "#e5e7eb" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="thisYear"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            strokeDasharray="0"
          />
          <Line
            type="monotone"
            dataKey="lastYear"
            stroke="#f472b6"
            strokeWidth={2}
            dot={false}
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}