import React from "react";
import Form from "../../components/Shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/Shared/Spinner";
import { toast } from "react-toastify";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="row g-0">
          <div className="col-md-8 form-banner">
            <img src="./assests/images/banner1.jpg" alt="loginImage"></img>
          </div>
          <div className="col-md-4 form-container">
            <Form
              formType={"login"}
              formTitle={"Login Page"}
              submitBtn={"Login"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
