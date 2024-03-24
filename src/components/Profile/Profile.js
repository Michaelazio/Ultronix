import React, { useReducer, useState } from "react";
import { useUserUpdatesProfileMutation } from "../../Redux/api";
import { setUserUpdatedProfile } from "../../Redux/authSlice";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

const Profile = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const [isPasswordChecked, setIsPasswordChecked] = useState(false);
  const [passwordCheckingValue, setPasswordCheckingValue] = useState("");
  const [userUpdatesProfile] = useUserUpdatesProfileMutation();
  const dispatchToStore = useDispatch();

  const { userUpdatedProfile, user, token } = useSelector(
    (state) => state.auth,
    shallowEqual
  );
  console.log(userUpdatedProfile);
  console.log(token);

  const initialFormData = { ...user };
  const formReducer = (state, action) => {
    switch (action.type) {
      case "UPDATE":
        return {
          ...state,
          [action.field]: action.value,
        };
      case "RESET":
        return {
          ...state,
          password: action.password,
        };
      default:
        return state;
    }
  };
  const [formData, dispatch] = useReducer(formReducer, initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE", field: name, value: value });
  };

  const apiBaseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:8080";
  const doCheckPassword = async (password) => {
    try {
      const status = await fetch(`${apiBaseUrl}/api/v1/password-check`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password }),
      })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res;
        })
        .then((data) => data.json())
        .catch((er) => console.log(er));
      return status;
    } catch (error) {
      return error;
    }
  };

  const passwordCheckHandler = async (e) => {
    e.preventDefault();
    if (passwordCheckingValue === confirmPassword) {
      const isPasswordStatus = await doCheckPassword(confirmPassword);

      console.log(isPasswordStatus);
      if (isPasswordStatus.success === true) {
        setPasswordCheckingValue("");
        setIsPasswordChecked(true);
      } else {
        setIsPasswordChecked(false);
        setConfirmPassword(" ");
        setPasswordCheckingValue(" ");
        alert("Invalid Input");
      }
    } else {
      setIsPasswordChecked(false);
      setConfirmPassword(" ");
      setPasswordCheckingValue(" ");
      alert("Password Mismatched Retype Password");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword !== formData.password) {
      alert("Incorrect Password !!");
      dispatch({ type: "RESET", password: "" });
      setConfirmPassword("");
    } else {
      const { data } = await userUpdatesProfile(JSON.stringify(formData));
      console.log(data);
      if (data) {
        setSuccess(data.success);

        dispatchToStore(setUserUpdatedProfile(data.updatedUserData));
        setConfirmPassword("");
      }
    }

    console.log("Form submitted with data:", formData);
    dispatch({ type: "RESET", password: "" });
  };

  const imageSubmitHandler = () => {};
  const imgUploadHandler = () => {};
  const submitPicHandler = () => {};

  return (
    <div className="profile-page">
      {isPasswordChecked ? (
        <>
          <div className="profile-form-container">
            <h1 className="profile-header-text">Update Profile</h1>
            {/* <div className="image-upload">
              <form onSubmit={imageSubmitHandler}>
                Image Upload
                <input type="file" onChange={imgUploadHandler} />
                <button type="submit" onClick={submitPicHandler}>
                  Upload Picture
                </button>
              </form>
            </div> */}
            <div className="inside-form-container">
              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="lastNm"
                  value={formData.lastNm}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="form-input"
                />
                <br />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="form-input"
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
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="form-input"
                />
                <br />
                <input
                  type="text"
                  name="primaryPhone"
                  value={formData.primaryPhone}
                  onChange={handleInputChange}
                  placeholder="Primary Phone"
                  className="form-input"
                />
                <br />
                <input
                  type="text"
                  name="secondaryPhone"
                  value={formData.secondaryPhone}
                  onChange={handleInputChange}
                  placeholder="Secondary Phone"
                  className="form-input"
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
          </div>
          <div className="updated-data-container">
            {success ? (
              <>
                <div className="label">
                  <h2>Last Name: {userUpdatedProfile.lastNm}</h2>
                </div>
                <div className="label">
                  <h2>Email: {userUpdatedProfile.email}</h2>
                </div>
                <div className="label">
                  <h2>Primary Phone: {userUpdatedProfile.primaryPhone}</h2>
                </div>
                <div className="label">
                  <h2>Secondary Phone: {userUpdatedProfile.secondaryPhone}</h2>
                </div>
                <div className="label">
                  {formData.password === passwordCheckingValue ? (
                    <h2>Please Don't Leave the Password Field Empty</h2>
                  ) : formData.password === user.password ? (
                    <h2> Password Not Changed</h2>
                  ) : formData.password === confirmPassword ? (
                    <h2>Password Match Found</h2>
                  ) : (
                    <h2> Typing.....</h2>
                  )}
                </div>
                <div className="label">
                  <h2>Address: {userUpdatedProfile.address}</h2>
                </div>
              </>
            ) : (
              <div className="label">
                {formData.password === "" ? (
                  <h2>Please Don't Leave the Password Field Empty</h2>
                ) : formData.password === user.password ? (
                  <h2>
                    Please Type your previous password or type newer to Update
                    but don't keep it undone!
                  </h2>
                ) : confirmPassword === formData.password ? (
                  <h2>Password Matched</h2>
                ) : (
                  <h2>Typing...</h2>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="profile-form-container">
            <form onSubmit={passwordCheckHandler}>
              <input
                type="password"
                name="password"
                value={passwordCheckingValue}
                onChange={(e) => setPasswordCheckingValue(e.target.value)}
                placeholder="Password"
                className="form-input"
              />
              <br />

              <input
                type="password"
                name="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="form-input"
              />
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

export default Profile;
