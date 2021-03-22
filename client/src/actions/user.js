import axios from "axios";

import { FETCH_USER, PATCH_USER, FAIL_REG, FAIL_LOG } from "../actions/types";

const API_URL = process.env.REACT_APP_API_URL || "/api/users";

export function getUserFromAPI(user) {
  const { email, password } = user;
  return async function (dispatch) {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    if (response.data.isUser) {
      let token = response.data.token;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("email", email);
      return dispatch(getUser(response.data));
    } else {
      return dispatch(failLog());
    }
  };
}

function getUser(user) {
  return {
    type: FETCH_USER,
    user,
  };
}

export function addUserToAPI(user) {
  return async function (dispatch) {
    const response = await axios.post(`${API_URL}/register`, {
      email: user.r_email,
      password: user.r_password,
      name: user.r_name,
      bio: "Update bio on Profile settings page",
      living: "Update current city on Profile settings page",
      img:
        "https://image.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg",
    });

    if (response.data.isRegistered) {
      let token = response.data.token;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("email", user.r_email);
      return dispatch(getUser(response.data));
    } else {
      return dispatch(failReg());
    }
  };
}

function failReg() {
  return {
    type: FAIL_REG,
  };
}

function failLog() {
  return {
    type: FAIL_LOG,
  };
}

export function patchUserOnAPI(user) {
  return async function (dispatch) {
    if (user.img === "") {
      user.img =
        "https://image.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg";
    }
    const response = await axios.patch(`${API_URL}/${user.id}`, {
      name: user.name,
      bio: user.bio,
      living: user.living,
      id: user.id,
      img: user.img,
    });

    let userInfo = response.data;

    return dispatch(editUser(userInfo));
  };
}

function editUser(user) {
  return {
    type: PATCH_USER,
    user,
  };
}
