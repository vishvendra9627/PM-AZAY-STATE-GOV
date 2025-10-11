
import React, { useEffect, useState } from "react";
import axios from "axios";

const demoNgos = [
  // {
  //   id: "demo1",
  //   name: "Helping Hands Foundation",
  //   location: "Delhi, India",
  //   contact_info: "contact@helpinghands.org",
  //   status: "Available",
  //   tasks_done: 120,
  //   rating: 4.8,
  //   last_active_at: new Date().toISOString(),
  // },
  // {
  //   id: "demo2",
  //   name: "Green Earth NGO",
  //   location: "Mumbai, India",
  //   contact_info: "info@greenearthngo.in",
  //   status: "Busy",
  //   tasks_done: 90,
  //   rating: 4.2,
  //   last_active_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  // },
  // {
  //   id: "demo3",
  //   name: "Sunshine Charity",
  //   location: "Kolkata, India",
  //   contact_info: "sunshine@charity.in",
  //   status: "Available",
  //   tasks_done: 150,
  //   rating: 4.9,
  //   last_active_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  // },
  // {
  //   id: "demo4",
  //   name: "Hope for All",
  //   location: "Chennai, India",
  //   contact_info: "hopeforall@gmail.com",
  //   status: "Busy",
  //   tasks_done: 75,
  //   rating: 4.1,
  //   last_active_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  // },
  // {
  //   id: "demo5",
  //   name: "Care & Share",
  //   location: "Bangalore, India",
  //   contact_info: "careandshare@mail.com",
  //   status: "Unavailable",
  //   tasks_done: 50,
  //   rating: 3.8,
  //   last_active_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  // },
];

function NgoDirectoryPage() {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    fundAllocated: "",
    startDate: "",
    deadline: "",
  });

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

  const openModal = (ngo) => {
    setSelectedNgo(ngo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNgo(null);
    setTaskData({ title: "", fundAllocated: "", startDate: "", deadline: "" });
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedNgo) return;
    if (!taskData.title || !taskData.fundAllocated || !taskData.startDate || !taskData.deadline) {
      setError("Please fill all task details");
      return;
    }

    const newTask = {
      ngoId: selectedNgo._id,
      ngoName: selectedNgo.name,
      title: taskData.title,
      fundAllocated: parseFloat(taskData.fundAllocated),
      assignedDate: new Date().toISOString(),
      startDate: taskData.startDate,
      deadline: taskData.deadline,
      status: "Pending",
    };

    try {
      await axios.post("http://localhost:4000/assign", newTask);
      alert("Task assigned successfully!");
      closeModal();
    } catch (err) {
      setError("Failed to assign task");
    }
  };

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
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {ngos.map((ngo) => (
                <tr key={ngo.id} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="py-3 px-6 font-medium text-blue-900">{ngo.name}</td>
                  <td className="py-3 px-6 text-gray-700">{ngo.location}</td>
                  <td className="py-3 px-6 text-blue-600 underline">{ngo.contactinfo}</td>
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
                  <td className="py-3 px-6 text-center text-gray-700">{ngo.tasksdone}</td>
                  <td className="py-3 px-6 text-center text-blue-700 font-bold">{ngo.rating.toFixed(1)} / 5</td>
                  <td className="py-3 px-6 text-gray-700">
                    {new Date(ngo.last_active_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-900 transition-colors">
                    <button onClick={() => openModal(ngo)}>
                      Assign Task
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      )}
       {isModalOpen && selectedNgo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">
              Assign Task to {selectedNgo.name}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={taskData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fund Allocated (₹)
                </label>
                <input
                  type="number"
                  name="fundAllocated"
                  value={taskData.fundAllocated}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={taskData.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={taskData.deadline}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-blue-100 text-gray-700 text-sm py-6 px-6 border-t border-blue-200 text-center w-full mt-auto">
        &copy; {new Date().getFullYear()} PM-AJAY NGO Directory. All rights reserved.
      </footer>
    </div>
  );
}

export default NgoDirectoryPage;
