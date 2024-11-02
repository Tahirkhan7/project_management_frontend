/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";

const CheckList = ({ text, checked, onCheckToggle, onDelete }) => {
  const [isChecklistVisible, setIsChecklistVisible] = useState(true);

  return (
    <div
      className="content"
      style={{
        maxHeight: isChecklistVisible ? "500px" : "0",
        overflow: "hidden",
        transition: "max-height 0.8s ease-in-out",
      }}
    >
      <div className="checklistBlock">
        <input type="checkbox" checked={checked} onChange={onCheckToggle} />
        <label>{text}</label>
        <img
          src="./images/main/Delete.png"
          alt="Delete"
          onClick={onDelete}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default CheckList;
