"use client";

import { Navigation, Clock, Fuel, TrendingUp } from "lucide-react";

export default function DriverOverview() {
  return (
    <div className="space-y-10">

      <div>
        <h1 className="text-3xl font-semibold">Trip History</h1>
        <p className="text-gray-400 text-sm">
          Past trips and performance metrics
        </p>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <Stat icon={<Navigation />} title="Total Trips" value="147"/>
        <Stat icon={<Clock />} title="Avg Trip Time" value="7.2h"/>
        <Stat icon={<Fuel />} title="Fuel Efficiency" value="4.8 km/L"/>
        <Stat icon={<TrendingUp />} title="On-Time Rate" value="94%"/>

      </div>

      {/* TRIPS TABLE */}

      <div className="bg-[#2a3038] rounded-2xl p-6">

        <h2 className="font-semibold mb-6">Recent Trips</h2>

        <table className="w-full text-sm">

          <thead className="text-gray-400">
            <tr>
              <th className="text-left pb-3">Trip ID</th>
              <th>Date</th>
              <th>Route</th>
              <th>Distance</th>
              <th>Duration</th>
              <th>Earnings</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody className="text-gray-300">

            <Row id="TRIP-0891" route="Nagpur → Mumbai" earn="₹4,200"/>
            <Row id="TRIP-0884" route="Mumbai → Pune" earn="₹1,800"/>
            <Row id="TRIP-0872" route="Pune → Hyderabad" earn="₹3,900"/>

          </tbody>

        </table>

      </div>

    </div>
  );
}

function Stat({ icon, title, value }) {
  return (
    <div className="bg-[#2a3038] p-6 rounded-2xl">

      <div className="w-10 h-10 bg-[#1f252b] rounded-lg flex items-center justify-center text-[#00ADB5] mb-4">
        {icon}
      </div>

      <h3 className="text-2xl font-semibold">{value}</h3>
      <p className="text-gray-400 text-sm">{title}</p>

    </div>
  );
}

function Row({ id, route, earn }) {
  return (
    <tr className="border-t border-[#2f363e]">

      <td className="py-4 text-[#00ADB5]">{id}</td>
      <td>28 Feb 2024</td>
      <td>{route}</td>
      <td>680 km</td>
      <td>8h 15m</td>
      <td>{earn}</td>

      <td>
        <span className="bg-[#00ADB5]/20 text-[#00ADB5] px-3 py-1 rounded-full text-xs">
          completed
        </span>
      </td>

    </tr>
  );
}