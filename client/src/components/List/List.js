import React from "react";
import "./List.css";

export const List = ({ children }) => {
  console.log("children", children)
  return (
    <div className="list-overflow-container" >
      <ul className="list-group" >
        {children}
      </ul>
    </div>
  );
};