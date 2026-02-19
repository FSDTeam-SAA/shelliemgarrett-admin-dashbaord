'use client';

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'JAN', thisYear: 25000, lastYear: 15000 },
  { month: 'FEB', thisYear: 35000, lastYear: 20000 },
  { month: 'MAR', thisYear: 28000, lastYear: 22000 },
  { month: 'APR', thisYear: 40000, lastYear: 25000 },
  { month: 'MAY', thisYear: 32000, lastYear: 28000 },
  { month: 'JUN', thisYear: 45000, lastYear: 35000 },
  { month: 'JUL', thisYear: 38000, lastYear: 32000 },
  { month: 'AUG', thisYear: 42000, lastYear: 38000 },
  { month: 'SEP', thisYear: 35000, lastYear: 30000 },
  { month: 'OCT', thisYear: 48000, lastYear: 40000 },
  { month: 'NOV', thisYear: 40000, lastYear: 35000 },
  { month: 'DEC', thisYear: 50000, lastYear: 42000 },
];

type TimePeriod = 'Day' | 'Week' | 'Month' | 'Year';

export function DonationReportChart() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('Month');

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

        <div className="flex gap-2">
          {(['Day', 'Week', 'Month', 'Year'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimePeriod(period)}
              className={`px-4 py-1 rounded text-sm font-medium transition-colors ${
                timePeriod === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
            tick={{ fill: '#666', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis
            tick={{ fill: '#666', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
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