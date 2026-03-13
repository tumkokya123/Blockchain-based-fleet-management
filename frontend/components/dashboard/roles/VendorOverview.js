"use client";

import { Wrench, Clock, CheckCircle } from "lucide-react";

export default function VendorOverview() {
  return (
    <div className="space-y-10">

      <div>
        <h1 className="text-3xl font-semibold">Service Requests</h1>
        <p className="text-gray-400 text-sm">
          Incoming maintenance requests
        </p>
      </div>

      <div className="space-y-6">

        <Request
          title="Engine Overhaul"
          vehicle="MH31-AB-1234"
          status="critical"
          price="₹45,000"
        />

        <Request
          title="Brake Pad Replacement"
          vehicle="MH14-GH-3456"
          status="high"
          price="₹12,000"
        />

        <Request
          title="AC Compressor Repair"
          vehicle="MH12-CD-5678"
          status="medium"
          price="₹8,500"
        />

      </div>

    </div>
  );
}

function Request({ title, vehicle, status, price }) {
  return (
    <div className="bg-[#2a3038] rounded-2xl p-6 flex justify-between items-center">

      <div>

        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="text-gray-400 text-sm mt-1">
          {vehicle}
        </p>

        <p className="text-sm mt-2">
          Est: {price}
        </p>

      </div>

      <div className="flex gap-3">

        <button className="px-4 py-2 rounded-lg bg-gray-600 text-sm">
          Decline
        </button>

        <button className="px-4 py-2 rounded-lg bg-[#00ADB5] text-sm">
          Accept
        </button>

      </div>

    </div>
  );
}