import axios from "axios";

export const postCurrentUser = async (e, userInput) => {
  try {
    e.preventDefault();
    const option = {
      method: "post",
      url: "/api/v1/auth/login",
      data: userInput,
    };
    // console.log("userInput", userInput);
    const response = await axios(option);
    // console.log(response.data.data);
    const { token, userName } = response.data.data;
    localStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const postSignUpUser = async (e, newUser) => {
  try {
    e.preventDefault();
    // console.log(newUser);
    const option = {
      method: "post",
      url: "/api/v1/auth/register",
      data: newUser,
    };
    const response = await axios(option);
    return true;
  } catch (error) {}
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const bodyParameters = {
      key: "value",
    };
    const option = {
      method: "get",
      url: "/api/v1/auth/",
      key: "value",
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios(option);
    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
