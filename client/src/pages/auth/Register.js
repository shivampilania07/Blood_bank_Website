import React from "react";
import Form from "../../components/Shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/Shared/Spinner";

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="row g-0">
          <div className="col-md-8 form-banner">
            <img src="./assests/images/banner2.jpg" alt="registerImage"></img>
          </div>
          <div className="col-md-4 form-container">
            <Form
              formType={"register"}
              formTitle={"Register Page"}
              submitBtn={"Register"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
