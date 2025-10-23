import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  console.log("res: ", res.data);
  return res.data;
  // const postPromise = apiRequest("/posts/" + params.id);
  // const commentPromise = apiRequest("/comments/" + params.id);
  // return defer({
  //   singlePostResponse: postPromise,
  //   commentResponse: commentPromise,
  // });
};
export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const postPromise = apiRequest("/posts?" + query);
  return defer({
    postResponse: postPromise,
  });
};

export const homePageLoader = async ({ request, params }) => {
  const postPromise = apiRequest("/posts?limit=3");
  return defer({
    recentPostsResponse: postPromise,
  });
};
export const profilePageLoader = async () => {
  const postPromise = apiRequest("/users/profilePosts");
  const chatPromise = apiRequest("/chats");
  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};

export const singleUserLoader = async ({ params }) => {
  const res = await apiRequest("/users/search/" + params.id);
  console.log("res: ", res.data);
  return res.data;
};

export const singleChatLoader = async (id) => {
  const res = await apiRequest(`/chats/single/${id}`);
  console.log("res: ", res.data);
  return res.data;
};
