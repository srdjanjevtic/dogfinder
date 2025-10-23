import { createContext, useEffect, useState } from "react";

export const CommentsContext = createContext();
export const CommentsContextProvider = ({ children }) => {
  const [comments, setComments] = useState(
    JSON.parse(localStorage.getItem("comments")) || []
  );
  const updateComments = (data) => {
    setComments(data);
  };
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  return (
    <CommentsContext.Provider value={{ comments, updateComments }}>
      {children}
    </CommentsContext.Provider>
  );
};
