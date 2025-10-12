import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function ProgressDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
const email = localStorage.getItem("email");
console.log(email)
  useEffect(() => {
  fetch(`http://localhost:4000/api/progress/user/${email}`)
    .then((res) => res.json())
    .then((resData) => {
      if (resData.data) {
        setReports(resData.data); // <-- use data array from API
      } else {
        setReports([]);
      }
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching reports:", err);
      setReports([]);
      setLoading(false);
    });
}, [email]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <CircularProgress sx={{ color: "#E65100" }} />
        <Typography sx={{ color: "#6D4C41", mt: 2 }}>Loading reports...</Typography>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#FFF8E1", minHeight: "100vh" }}>
      <Navbar />

      <Box sx={{ p: 3, mt: 10 }}>
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: "#795548",
            textAlign: "center",
          }}
        >
          🏛️ Village Progress Reports
        </Typography>

        {reports.map((reportData) => (
          <Card
            key={reportData._id}
            sx={{
              backgroundColor: "#FFF3E0",
              boxShadow: 4,
              borderRadius: 3,
              p: 2,
              mb: 4,
              border: "2px solid #FFD54F",
              transition: "transform 0.2s ease",
              "&:hover": { transform: "scale(1.01)" },
            }}
          >
            <CardContent>
              {/* Village Info */}
              <Typography
                variant="h5"
                sx={{ color: "#E65100", fontWeight: "bold", mb: 1 }}
              >
                {reportData.villageName} ({reportData.state})
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#6D4C41", mb: 2 }}>
                District: {reportData.district} | Village ID: {reportData.villageID}
              </Typography>

              {/* Total Funds Allocated */}
              <Typography
                variant="h6"
                sx={{ color: "#BF360C", fontWeight: "bold", mb: 2 }}
              >
                💰 Total Funds Allocated: ₹{reportData.totalFundsAllocated || 0}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* User Info */}
              <Typography sx={{ color: "#4E342E", mb: 1 }}>
                <b>Submitted by:</b> {reportData.userName}
              </Typography>
              <Typography sx={{ color: "#4E342E" }}>
                <b>Email:</b> {reportData.userEmail}
              </Typography>
              <Typography sx={{ color: "#4E342E", mb: 2 }}>
                <b>Contact:</b> {reportData.contactInfo}
              </Typography>

              <Divider sx={{ mb: 2 }} />

              {/* Reports Section */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#BF360C",
                  mb: 2,
                  textDecoration: "underline",
                }}
              >
                Reports:
              </Typography>

              {reportData.reports.map((r, i) => (
                <Box
                  key={i}
                  sx={{
                    backgroundColor: r.submitted ? "#FFE0B2" : "#FFEBEE",
                    borderRadius: 2,
                    p: 2,
                    mb: 3,
                    boxShadow: 1,
                    cursor: r.submitted ? "default" : "pointer",
                    "&:hover": r.submitted ? {} : { backgroundColor: "#FFD180" },
                  }}
                  onClick={() => {
                    if (!r.submitted) {
                      navigate(`/update-progress/${reportData.villageID}`);
                    }
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      color: r.submitted ? "#E64A19" : "#B71C1C",
                    }}
                  >
                    {r.title || `Report ${i + 1}`}
                  </Typography>

                  {r.submitted ? (
                    <>
                      <Typography
                        sx={{ color: "#3E2723", mb: 1, whiteSpace: "pre-line" }}
                      >
                        {r.description || "No description provided."}
                      </Typography>

                      {/* Funds Spent (except current condition report) */}
                      {i !== 0 && (
                        <Typography sx={{ color: "#4E342E", mb: 1 }}>
                          💸 Funds Spent: ₹{r.fundsSpent || 0}
                        </Typography>
                      )}

                      {/* Photos */}
                      {r.photos && r.photos.length > 0 && (
                        <>
                          <Typography
                            variant="subtitle2"
                            sx={{ color: "#5D4037", fontWeight: "bold", mb: 1 }}
                          >
                            📸 Photos:
                          </Typography>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
                            {r.photos.map((photo, idx) => (
                              <a
                                key={idx}
                                href={`http://localhost:5000${photo}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img
                                  src={`http://localhost:5000${photo}`}
                                  alt="Report"
                                  style={{
                                    width: "200px",
                                    height: "150px",
                                    objectFit: "cover",
                                    borderRadius: "12px",
                                    border: "3px solid #FFB300",
                                    boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
                                    cursor: "pointer",
                                  }}
                                />
                              </a>
                            ))}
                          </Box>
                        </>
                      )}

                      {/* Videos */}
                      {r.videos && r.videos.length > 0 && (
                        <>
                          <Typography
                            variant="subtitle2"
                            sx={{ color: "#5D4037", fontWeight: "bold", mb: 1 }}
                          >
                            🎥 Videos:
                          </Typography>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                            {r.videos.map((video, idx) => (
                              <video
                                key={idx}
                                src={`http://localhost:5000${video}`}
                                width="240"
                                height="140"
                                controls
                                style={{
                                  borderRadius: "12px",
                                  border: "3px solid #FFB300",
                                  boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
                                }}
                              />
                            ))}
                          </Box>
                        </>
                      )}

                      <Typography sx={{ mt: 2, color: r.aiChecked ? "green" : "red" }}>
                        ✅ AI Checked: {r.aiChecked ? "Yes" : "No"}
                      </Typography>
                      <Typography sx={{ color: r.submitted ? "green" : "red" }}>
                        📤 Submitted: {r.submitted ? "Yes" : "No"}
                      </Typography>
                    </>
                  ) : (
                    <Typography
                      sx={{
                        color: "#C62828",
                        fontStyle: "italic",
                        mt: 1,
                        fontWeight: "bold",
                      }}
                    >
                      ⚠️ This report has not been submitted yet. Click to submit.
                    </Typography>
                  )}
                </Box>
              ))}
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
}

export default ProgressDashboard;