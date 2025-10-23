import { createContext, useEffect, useState } from "react";

export const PostContext = createContext();
export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("posts")) || []
  );
  const updatePosts = (data) => {
    setPosts(data);
  };
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  return (
    <PostContext.Provider value={{ posts, updatePosts }}>
      {children}
    </PostContext.Provider>
  );
};
jg, jhv, jg;
