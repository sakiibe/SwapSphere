import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "../UserProfile/UserProfile.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import editImage from "../../images/rakshit images/edit_icon.png";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    const headersData = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    axios
      .get("http://localhost:8080/user/getUserDetailwithToken", headersData)
      .then((response) => {
        const userData = response.data;
        setProfilePicture(userData.userProfilePhoto);
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setPassword(userData.password);
        setMobile(userData.mobile);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const setEditableState = () => {
    setIsEditMode((isEditMode) => !isEditMode);
    console.log(isEditMode);
  };

  const saveProfile = async () => {
    const formDataToSend = {
      token: localStorage.getItem("authToken"),
      profilePicture: profilePicture,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      mobile: mobile,
    };

    try {
      await axios.post(
        "http://localhost:8080/user/setUserDetailwithToken",
        formDataToSend
      );
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleMyWishlistButton = () => {
    navigate("/wishlist");
  };

  const handleMyListingsButton = () => {
    navigate("/myListings");
  };

  return (
    <div>
      {" "}
      <Navbar />
      <div class="container-fluid box p-0 m-0 max-height user-profile-theme-color ">
        <div class="row m-0 ">
          <div className="col-lg-5 d-lg-flex justify-content-center align-items-center  p-0">
            <div className=" d-flex flex-column align-items-center ms-lg-5 mt-md-3">
              <div className="thumbnail-container mb-3">
                <img src={profilePicture} alt="" className="thumbnail-image" />
                {isEditMode && (
                  <div className="clickable-image">
                    <button className="choose-image-button">
                      <label htmlFor="imageInput">
                        <img
                          src={editImage}
                          class="choose-image-icon rounded"
                        />
                      </label>
                      <input
                        id="imageInput"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                      />
                    </button>
                  </div>
                )}
              </div>
              <div className="mb-3 choose-height"></div>
            </div>
          </div>

          <div class="col-lg-7 max-height p-0 d-flex align-items-lg-center user-profile-theme-color">
            <div class="container-fluid m-0 p-lg-4 p-md-0 ">
              <div className=" flex-responsive d-flex flex-column align-items-center justify-content-center">
                <p class="me-lg-5 fs-1 font">User Profile</p>
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center  me-lg-5">
                <div class="mb-3 w-75 ">
                  <label for="email " class=" mb-1 title-font ">
                    First Name:
                  </label>

                  {isEditMode ? (
                    <input
                      type="text"
                      name="firstName"
                      className="form-control "
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  ) : (
                    <div class=" output-font d-flex flex-row align-items-center">
                      {firstName}
                    </div>
                  )}
                </div>

                <div class="mb-3 w-75 ">
                  <label for="email " class=" mb-1  title-font ">
                    Last Name:
                  </label>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="lastName "
                      className="form-control"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  ) : (
                    <div class=" output-font d-flex flex-row align-items-center">
                      {lastName}
                    </div>
                  )}
                </div>

                <div class=" mb-3 w-75 ">
                  <label for="email " class=" mb-1  title-font ">
                    Email:
                  </label>
                  <div class=" output-font">{email}</div>
                </div>

                <div class="mb-3 w-75 ">
                  <label for="mobile " class=" mb-1  title-font ">
                    Mobile:
                  </label>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="mobile"
                      className="form-control"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  ) : (
                    <div class="output-font d-flex flex-row align-items-center">
                      {mobile}
                    </div>
                  )}
                </div>

                {isEditMode ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setEditableState();
                      saveProfile();
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button class=" btn btn-light" onClick={setEditableState}>
                    Edit
                  </button>
                )}

                {!isEditMode ? (
                  <div class="row">
                    <div class=" col-12">
                      <button
                        class="btn btn-primary me-5"
                        onClick={handleMyWishlistButton}
                      >
                        My Wishlist
                      </button>
                      <button
                        class="btn btn-primary ms-5"
                        onClick={handleMyListingsButton}
                      >
                        My Listings
                      </button>
                    </div>
                  </div>
                ) : (
                  <div class="output-font d-flex flex-row align-items-center choose-height"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
