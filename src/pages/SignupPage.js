import React, {  useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserSignupMutation } from "../Redux/api";


const initialFormData = {
  firstNm: "",
  lastNm: "",
  email: "",
  password: "",
  primaryPhone: "",
  secondaryPhone: "",
  address: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "RESET":
      return action.initialState;
    default:
      return state;
  }
};

const SignupPage = () => {
  const [formData, dispatch] = useReducer(formReducer, initialFormData);
  const [confirmPassword, setConfirmPassword] = useState();
  const [resMsg, setResMsg] = useState(null);
  const [success, setSuccess] = useState(false);
  const [userSignup, { error }] = useUserSignupMutation();
  const navigate = useNavigate();
 




  // For CSRF dealing 
  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE", field: name, value: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.firstNm === "" &&
      formData.email === "" &&
      formData.password === ""
    ) {
      alert("Submission is Required!");
    } else if (formData.password !== confirmPassword) {
      alert("Incorrect Password");
      setConfirmPassword("");
    } else {
      try {
        const { data } = await userSignup(JSON.stringify(formData));
        console.log(data);
        if (data) {
          const timeToLogin = setTimeout(() => navigate("/login"), 3000);
          setSuccess(data.success);
          setResMsg(data.message);
          return () => clearTimeout(timeToLogin);
        }
      } catch (error) {
        console.error("Error occurred during signup:", error);
        
      }
    }
  
    console.log("Form submitted with data:", formData);
    dispatch({ type: "RESET", initialState: initialFormData });
  };
  

  const handleConfirmPassword = async (e) => {
    e.preventDefault();
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="signup-page">
      {error ? (
        <h1>{resMsg}</h1>
      ) : success ? (
        <h1>{resMsg}</h1>
      ) : (
        <>
          <h1>Signup</h1>
          <div className="signup-address-container">
            <form className="form-container" onSubmit={handleSubmit}  >
              
              <input
                type="text"
                name="firstNm"
                value={formData.firstNm}
                onChange={handleInputChange}
                placeholder="First Name"
                className="form-input"
                required
              />
              <br />
              <input
                type="text"
                name="lastNm"
                value={formData.lastNm}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="form-input"
                required
              />
              <br />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="form-input"
                required
              />
              <br />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="form-input"
              />
              <br />

              <input
                type="password"
                name="confirm-password"
                value={confirmPassword}
                onChange={handleConfirmPassword}
                placeholder="Confirm Password"
                className="form-input"
                required
              />
              <br />
              <input
                type="text"
                name="primaryPhone"
                value={formData.primaryPhone}
                onChange={handleInputChange}
                placeholder="Primary Phone"
                className="form-input"
                required
              />
              <br />
              <input
                type="text"
                name="secondaryPhone"
                value={formData.secondaryPhone}
                onChange={handleInputChange}
                placeholder="Secondary Phone"
                className="form-input"
                required
              />
              <br />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="form-textarea"
              ></textarea>
              <br />
              <button type="submit" className="form-button">
                Submit
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default SignupPage;
