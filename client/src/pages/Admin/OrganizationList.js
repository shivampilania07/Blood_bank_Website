import React, { useEffect, useState } from "react";
import Layout from "../../components/Shared/Layout/Layout";
import moment from "moment";
import API from "../../services/api";

const OrganizationList = () => {
  const [data, setData] = useState([]);
  //find donar records
  const orgData = async () => {
    try {
      const { data } = await API.get("/admin/org-list");
      console.log(data);
      if (data?.success) {
        setData(data?.orgData);
      }
    } catch (error) {}
  };

  useEffect(() => {
    orgData();
  }, []);

  //DELETE FUNCTION
  const handleDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are you sure you want to Delete this Organization",
        "Sure",
      );
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-org/${id}`);
      alert(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.organizationName}</td>
              <td>{record.email}</td>

              <td>{record.phone}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              <td>
                <div
                  className="btn btn-danger"
                  onClick={() => handleDelete(record._id)}
                >
                  DELETE
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default OrganizationList;
