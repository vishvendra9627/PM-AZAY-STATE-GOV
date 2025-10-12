// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaUsers, FaTasks, FaRegCheckCircle, FaRupeeSign } from "react-icons/fa";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// // Dummy activities and chart data for demo (you can fetch via API if needed)
// const sampleActivities = [
//   { id: 1, title: "NGO 'Helping Hands' registered", date: "2025-10-01" },
//   { id: 2, title: "Task 'Health Survey' updated", date: "2025-10-02" },
//   { id: 3, title: "NGO 'Green Earth' new project started", date: "2025-10-03" },
// ];

// const barData = [
//   { name: "Completed", Tasks: 230 },
//   { name: "Pending", Tasks: 70 },
// ];
// const fundUtilization = 74;

// function StatCard({ icon: Icon, label, value, colorCls }) {
//   return (
//     <div className={`flex items-center bg-white shadow-sm rounded-lg p-6 border-t-4 ${colorCls} gap-5`}>
//       <div className="p-4 rounded-full bg-blue-50">
//         <Icon className="text-2xl text-blue-700" />
//       </div>
//       <div>
//         <div className="text-lg font-bold text-gray-900">{value}</div>
//         <div className="text-gray-500 text-sm">{label}</div>
//       </div>
//     </div>
//   );
// }

// function OverviewPage() {
//   const [stats, setStats] = useState({ ngoCount: 0, taskTotal: 0, completedTasks: 0, totalFunds: 0 });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get("http://localhost:4000/overview")
//       .then(res => {
//         setStats(res.data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 p-7 font-sans flex flex-col">
//       <header className="w-full px-4 py-8 mb-12 border-b border-gray-200 bg-white/80">
//         <h1 className="text-3xl font-extrabold tracking-tight text-blue-900">Overview Dashboard</h1>
//         <p className="text-base font-medium text-gray-600 mt-2">
//           Key platform metrics and live NGO activity highlights at a glance.
//         </p>
//       </header>
//       {loading ? (
//         <div className="text-center text-lg text-gray-700 py-7">Loading overview...</div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-14">
//             <StatCard label="Total NGOs" value={stats.ngoCount} icon={FaUsers} colorCls="border-blue-200" />
//             <StatCard label="Total Tasks" value={stats.taskTotal} icon={FaTasks} colorCls="border-blue-200" />
//             <StatCard label="Tasks Completed" value={stats.completedTasks} icon={FaRegCheckCircle} colorCls="border-green-200" />
//             <StatCard
//               label="Total Funds (₹)"
//               value={stats.totalFunds.toLocaleString("en-IN")}
//               icon={FaRupeeSign}
//               colorCls="border-blue-200"
//             />
//           </div>

//           <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
//             {/* Recent Activities */}
//             <div className="bg-white rounded-lg shadow p-6 flex flex-col">
//               <h3 className="font-semibold text-lg mb-4 text-blue-800">Recent Activities</h3>
//               <ul className="list-disc list-inside space-y-2 text-gray-700">
//                 {sampleActivities.map(a => (
//                   <li key={a.id}>[{a.date}] {a.title}</li>
//                 ))}
//               </ul>
//             </div>

//             {/* Tasks Overview Bar Chart */}
//             <div className="bg-white rounded-lg shadow p-6">
//               <h3 className="font-semibold text-lg mb-4 text-blue-800">Tasks Overview</h3>
//               <ResponsiveContainer width="100%" height={150}>
//                 <BarChart data={barData}>
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="Tasks" fill="#3182ce" radius={[5, 5, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Fund Utilization Progress */}
//             <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-center">
//               <h3 className="font-semibold text-lg mb-4 text-blue-800">Fund Utilization</h3>
//               <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
//                 <div
//                   className="bg-blue-600 h-full"
//                   style={{ width: `${fundUtilization}%` }}
//                 />
//               </div>
//               <div className="mt-2 text-center text-gray-700">{fundUtilization}% of total funds utilized</div>
//             </div>
//           </div>
//         </>
//       )}
//       {/* Optional: Add announcements or quick actions here */}
//       <footer className="bg-blue-100 text-gray-700 text-sm py-6 px-6 border-t border-blue-200 text-center w-full mt-auto">
//         &copy; {new Date().getFullYear()} PM-AJAY Dashboard. All rights reserved.
//       </footer>
//     </div>
//   );
// }

// export default OverviewPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Grid,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import {  useNavigate } from "react-router-dom";

export default function OverviewPage() {
  const [fundAllocations, setFundAllocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate=useNavigate();


  // Fetch fund allocations from backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:4000/api/villages");
        setFundAllocations(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching fund allocations");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAssignNGO = (villageID) => {
  navigate("/ngos", { state: { villageID } });
};



  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 3, textAlign: "center" }}>
        {error}
      </Typography>
    );
  }

  if (!fundAllocations || fundAllocations.length === 0) {
    return (
      <Typography sx={{ mt: 3, textAlign: "center" }}>
        No fund allocation records found.
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
        Village Fund Allocations
      </Typography>

      <Grid container spacing={3}>
        {fundAllocations.map((record) => (
          <Grid item xs={12} sm={6} md={4} key={`${record.villageID}-${record.allocatedAt}`}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {record.villageName} ({record.villageID})
                </Typography>
                <Typography><strong>District:</strong> {record.district}</Typography>
                <Typography><strong>State:</strong> {record.state}</Typography>
                <Typography>
                  <strong>Amount:</strong> ₹{record.amount.toLocaleString()}
                </Typography>
                <Typography><strong>Allocated By:</strong> {record.allocatedBy}</Typography>
                <Typography>
                  <strong>Allocated At:</strong>{" "}
                  {new Date(record.allocatedAt).toLocaleString()}
                </Typography>
                <Button
      variant="contained"
      color="primary"
      onClick={()=>handleAssignNGO(record.villageID)}
    
    >
      Assign NGO's

    </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

    

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Fund allocation successful!
        </Alert>
      </Snackbar>
    </Box>
  );
}
