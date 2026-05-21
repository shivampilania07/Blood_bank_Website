import React, { useEffect, useState } from "react";
import Layout from "../components/Shared/Layout/Layout";
import { useSelector } from "react-redux";
import API from "../services/api";
import moment from "moment";

const Donation = () => {
  const { user } = useSelector((state) => state.auth);

  const [data, setData] = useState([]);

  // GET DONATION RECORDS
  const getDonars = async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "in",
          donar: user?._id,
        },
      });

      if (data?.success) {
        setData(data?.inventory);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line
  useEffect(() => {
    getDonars();
  }, [user?._id]);

  return (
    <Layout>
      <div className="container mt-4">
        <h3 className="mb-3">My Donation Records</h3>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity(ml)</th>
              <th scope="col">Organization Email</th>
              <th scope="col">Date</th>
            </tr>
          </thead>

          <tbody>
            {data?.length > 0 ? (
              data.map((record) => (
                <tr key={record._id}>
                  <td>{record.bloodGroup}</td>
                  <td>{record.inventoryType}</td>
                  <td>{record.quantity}</td>

                  <td>{record.organization?.email}</td>

                  <td>
                    {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No Donation Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Donation;
