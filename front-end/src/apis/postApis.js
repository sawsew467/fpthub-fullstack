import axios from "axios";

export const getAllPosts = async () => {
  try {
    const option = {
      method: "get",
      url: "/api/v1/posts",
    };
    const response = await axios(option);
    const posts = response.data.data.posts;
    // console.log(posts);
    return posts;
  } catch (error) {
    console.log(error);
  }
};

export const createOnePost = async (newPost) => {
  try {
    const token = localStorage.getItem("token");
    const option = {
      method: "post",
      url: "/api/v1/posts",
      data: newPost,
      key: "value",
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios(option);
    // console.log(response.data);
  } catch (error) {}
};

export const updateOnePost = async (_idPost, updatedData) => {
  try {
    const token = localStorage.getItem("token");
    const option = {
      method: "put",
      url: `/api/v1/posts/${_idPost}`,
      data: {updatedData, _idPost},
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios(option);
  } catch (error) {
    console.log(error);
  }
};
