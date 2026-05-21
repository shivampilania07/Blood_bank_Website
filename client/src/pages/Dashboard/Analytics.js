import React, { useState, useEffect } from "react";
import Header from "../../components/Shared/Layout/Header";
import API from "../../services/api";
import "../../styles/analytics.css";
import moment from "moment";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);

  // FETCH BLOOD GROUP ANALYTICS
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");

      if (data?.success) {
        setData(data?.bloodGroupData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH RECENT INVENTORY
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");

      if (data?.success) {
        setInventoryData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodGroupData();
    getBloodRecords();
  }, []);

  return (
    <>
      <Header />

      <div
        className="analytics-container"
        style={{
          minHeight: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          paddingBottom: "40px",
        }}
      >
        {/* TITLE */}
        <div className="text-center mt-4 mb-5">
          <h1
            style={{
              fontWeight: "700",
              fontSize: "3rem",
              color: "#b30000",
              letterSpacing: "1px",
            }}
          >
            Blood Bank Analytics
          </h1>

          <p
            style={{
              color: "#666",
              fontSize: "18px",
            }}
          >
            Monitor blood inventory & recent activities
          </p>
        </div>

        {/* ANALYTICS CARDS */}
        <div className="container">
          <div className="row">
            {data?.map((record, i) => (
              <div className="col-md-3 mb-4" key={i}>
                <div
                  className="card shadow-lg border-0"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    transition: "0.3s",
                    background: "linear-gradient(135deg, #ff4d4d, #b30000)",
                    color: "white",
                  }}
                >
                  <div className="card-body text-center p-4">
                    <div
                      style={{
                        width: "90px",
                        height: "90px",
                        borderRadius: "50%",
                        background: "white",
                        color: "#b30000",
                        margin: "0 auto 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "30px",
                        fontWeight: "bold",
                        boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
                      }}
                    >
                      {record.bloodGroup}
                    </div>

                    <h5 className="mb-3">Blood Statistics</h5>

                    <div className="d-flex justify-content-between mb-2">
                      <span>Total In</span>
                      <strong>{record.totalIn} ML</strong>
                    </div>

                    <div className="progress mb-3" style={{ height: "10px" }}>
                      <div
                        className="progress-bar bg-success"
                        style={{
                          width: `${Math.min(record.totalIn, 100)}%`,
                        }}
                      ></div>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <span>Total Out</span>
                      <strong>{record.totalOut} ML</strong>
                    </div>

                    <div className="progress mb-3" style={{ height: "10px" }}>
                      <div
                        className="progress-bar bg-warning"
                        style={{
                          width: `${Math.min(record.totalOut, 100)}%`,
                        }}
                      ></div>
                    </div>

                    <div
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        padding: "12px",
                        borderRadius: "12px",
                        marginTop: "20px",
                        fontSize: "18px",
                      }}
                    >
                      Available :<strong> {record.availableBlood} ML</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT INVENTORY TABLE */}
        <div className="container mt-5">
          <div
            className="card shadow-lg border-0"
            style={{
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <div
              className="card-header text-white"
              style={{
                background: "linear-gradient(90deg, #b30000, #ff4d4d)",
                padding: "20px",
              }}
            >
              <h3 className="mb-0">
                <i className="fa-solid fa-clock-rotate-left me-2"></i>
                Recent Blood Inventory
              </h3>
            </div>

            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead
                    style={{
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    <tr>
                      <th className="p-3">Blood Group</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Quantity</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Date & Time</th>
                    </tr>
                  </thead>

                  <tbody>
                    {inventoryData?.map((record) => (
                      <tr key={record._id}>
                        <td className="p-3">
                          <span
                            style={{
                              background: "#ffebeb",
                              color: "#b30000",
                              padding: "8px 15px",
                              borderRadius: "20px",
                              fontWeight: "bold",
                            }}
                          >
                            {record.bloodGroup}
                          </span>
                        </td>

                        <td className="p-3">
                          <span
                            className={`badge ${
                              record.inventoryType === "in"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                            style={{
                              padding: "10px",
                              fontSize: "14px",
                            }}
                          >
                            {record.inventoryType.toUpperCase()}
                          </span>
                        </td>

                        <td className="p-3">
                          <strong>{record.quantity} ML</strong>
                        </td>

                        <td className="p-3">{record.email}</td>

                        <td className="p-3">
                          {moment(record.createdAt).format(
                            "DD/MM/YYYY hh:mm A",
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {inventoryData?.length === 0 && (
                  <div className="text-center p-5">
                    <h4>No Recent Inventory Found</h4>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
