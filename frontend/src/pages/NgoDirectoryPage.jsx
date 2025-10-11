// src/pages/NgoDirectoryPage.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const demoNgos = [
  {
    id: "demo1",
    name: "Helping Hands Foundation",
    location: "Delhi, India",
    contact_info: "contact@helpinghands.org",
    status: "Available",
    tasks_done: 120,
    rating: 4.8,
    last_active_at: new Date().toISOString(),
  },
  {
    id: "demo2",
    name: "Green Earth NGO",
    location: "Mumbai, India",
    contact_info: "info@greenearthngo.in",
    status: "Busy",
    tasks_done: 90,
    rating: 4.2,
    last_active_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo3",
    name: "Sunshine Charity",
    location: "Kolkata, India",
    contact_info: "sunshine@charity.in",
    status: "Available",
    tasks_done: 150,
    rating: 4.9,
    last_active_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo4",
    name: "Hope for All",
    location: "Chennai, India",
    contact_info: "hopeforall@gmail.com",
    status: "Busy",
    tasks_done: 75,
    rating: 4.1,
    last_active_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo5",
    name: "Care & Share",
    location: "Bangalore, India",
    contact_info: "careandshare@mail.com",
    status: "Unavailable",
    tasks_done: 50,
    rating: 3.8,
    last_active_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

function NgoDirectoryPage() {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/ngos")
      .then((res) => {
        setNgos([...demoNgos, ...res.data]);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching NGOs");
        setNgos(demoNgos);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-gray-50 to-indigo-100 font-sans flex flex-col">
      {/* Top Banner with SVG wave */}
      <header className="w-full relative">
        <div className="w-full h-40 bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-400 flex items-center px-10">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-wide mb-1 drop-shadow">
              NGO Directory Page
            </h1>
            <p className="text-white/90 text-lg max-w-3xl mb-2 font-medium drop-shadow">
              Explore our curated NGOs making an impact in their communities.
            </p>
          </div>
        </div>
        {/* SVG line at bottom of banner */}
        <svg viewBox="0 0 1500 80" className="absolute left-0 bottom-0 w-full h-16" fill="none">
          <path
            d="M0 40 Q375 80 750 40T1500 40V80H0V40Z"
            fill="#f8fafc" fillOpacity="0.33"
          />
        </svg>
      </header>
      
      {/* Status messages */}
      <div className="my-4 mx-auto w-full max-w-7xl">
        {loading && <p className="text-gray-700 text-center py-8 text-lg">Loading NGOs...</p>}
        {error && <p className="text-red-600 text-center py-8">{error}</p>}
      </div>

      {/* Large full-width table, not in any card/box */}
      {!loading && (
        <main className="flex-1 w-full max-w-7xl mx-auto px-2 py-4 overflow-x-auto">
          <table className="min-w-full border-t border-b border-blue-200 divide-y divide-gray-200 bg-transparent">
            <thead className="bg-blue-50">
              <tr className="text-left text-blue-600 uppercase text-xs font-semibold border-b border-blue-200">
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Location</th>
                <th className="py-3 px-6">Contact Info</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-center">Tasks Done</th>
                <th className="py-3 px-6 text-center">Rating</th>
                <th className="py-3 px-6">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {ngos.map((ngo) => (
                <tr key={ngo.id} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="py-3 px-6 font-medium text-blue-900">{ngo.name}</td>
                  <td className="py-3 px-6 text-gray-700">{ngo.location}</td>
                  <td className="py-3 px-6 text-blue-600 underline">{ngo.contact_info}</td>
                  <td
                    className={`py-3 px-6 font-semibold ${
                      ngo.status === "Available"
                        ? "text-green-600"
                        : ngo.status === "Busy"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {ngo.status}
                  </td>
                  <td className="py-3 px-6 text-center text-gray-700">{ngo.tasks_done}</td>
                  <td className="py-3 px-6 text-center text-blue-700 font-bold">{ngo.rating.toFixed(1)} / 5</td>
                  <td className="py-3 px-6 text-gray-700">
                    {new Date(ngo.last_active_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      )}

      {/* Footer */}
      <footer className="bg-blue-100 text-gray-700 text-sm py-6 px-6 border-t border-blue-200 text-center w-full mt-auto">
        &copy; {new Date().getFullYear()} PM-AJAY NGO Directory. All rights reserved.
      </footer>
    </div>
  );
}

export default NgoDirectoryPage;