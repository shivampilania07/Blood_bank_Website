import React from "react";
import Layout from "../../components/Shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-column mt-4">
          <h1>
            Welcome Admin <i className="text-success">{user?.name}</i>
          </h1>
          <h3>Manage Blood Bank App</h3>
          <hr />
          <p>
            Welcome to the Blood Bank Admin Dashboard, your central hub for
            managing donors, blood inventory, emergency requests, and user
            activities efficiently. Monitor blood stock levels in real time,
            track donation records, approve requests, and analyze platform
            performance through meaningful insights. This dashboard helps ensure
            timely availability of blood for patients in need while improving
            coordination between donors and recipients. With organized data
            management, secure administration tools, and streamlined workflows,
            administrators can make faster decisions, reduce shortages, and
            strengthen the overall blood donation ecosystem—contributing to a
            more reliable, responsive, and life-saving healthcare support
            system.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
