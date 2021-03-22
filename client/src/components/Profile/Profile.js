import React, { useState, useEffect } from "react";

import "./css/Profile.css";
import Menu from "../Menu";
import { patchUserOnAPI } from "../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getUserInfoFromAPI } from "../../actions/user";

const Profile = () => {
  const token = window.sessionStorage.getItem("token");
  const email = window.sessionStorage.getItem("email");

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (token) {
      dispatch(getUserInfoFromAPI(token, email));
    } else {
      history.push("/login");
    }
  }, []);

  const initial_state = {
    name: "",
    living: "",
    bio: "",
    img: "",
  };
  const initial_errors = { name: false };
  const [formData, setFormData] = useState(initial_state);
  const [errors, setErrors] = useState(initial_errors);
  const [showErrors, setShowErrors] = useState(false);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      let { bio, living, name, img } = user;
      let userData = {
        bio: bio === null ? "" : bio,
        living: living === null ? "" : living,
        name: name,
        img: img.length > 0 ? img : "",
      };
      setFormData(userData);
    }
  }, [user]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  useEffect(() => {
    let e = { ...errors };
    let { name } = formData;

    if (name.length === 0) {
      e.name = true;
    } else {
      e.name = false;
    }

    if (showErrors) {
      setErrors(e);
    }
  }, [showErrors]);

  const handleSubmit = async () => {
    setShowErrors(true);

    const { name } = errors;

    if (!name) {
      let userData = { ...formData, id: user.id };

      dispatch(patchUserOnAPI(userData));
      history.push("/dashboard");
    }
  };

  if (!user) {
    return <div className="redirect">Loading</div>;
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-menu">
        <Menu />
      </div>
      <div className="profile-content">
        <div className="profile-content-title">
          <div className="profile-title-main">Personal information</div>
          <div className="profile-title-sub">
            This information is displayed in your profile
          </div>
        </div>
        <div className="profile-inputs">
          <div className="profile-line">
            <div className="profile-label">
              Full name<span>*</span>
            </div>
            <div className="profile-input">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name ? (
                <div className="profile-error">Input needed</div>
              ) : null}
            </div>
          </div>
          <div className="profile-line">
            <div className="profile-label">Living in</div>
            <div className="profile-input">
              <input
                type="text"
                name="living"
                value={formData.living}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="profile-line">
            <div className="profile-label">Bio</div>
            <div className="profile-input">
              <div className="profile-input-textarea">
                <textarea
                  style={{ resize: "none" }}
                  cols="50"
                  rows="10"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="profile-line">
          <div className="profile-label">Image url</div>
          <div className="profile-input">
            <input
              type="text"
              name="img"
              value={formData.img}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="profile-btn-wrapper">
          <div className="profile-form-button" onClick={handleSubmit}>
            Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
