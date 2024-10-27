/* eslint-disable react/prop-types */

import { useState } from "react";
import styles from "./HeroBlock.module.css";

const HeroBlock = ({ id, task }) => {

  const [formData, setFormData] = useState({
    task1: false,
    task2: false,
    task3: false,
  });

  const [isChecklistVisible, setIsChecklistVisible] = useState(true); // Toggle checklist visibility
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown open/close state

  // Array of dropdown options
  const options = ["Edit", "Share", "Delete"];

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleToggleChecklist = () => {
    setIsChecklistVisible(!isChecklistVisible);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = () => {
    setDropdownOpen(false);
  };

  return (
    <>
      {/* ====== Hero Section Start ====== */}
      {task && (
        <div key={id} className={styles.heroSecBlock}>
          <div className={styles.prioritySec}>
            <span>{task.priority.toUpperCase()} PRIORITY</span>
            {/* Dropdown for filter */}
            <div className={`${styles.dropdown} threeDots`}>
              <button className={styles.dropbtn} onClick={toggleDropdown}>
                <img
                  src="./images/main/dots.png"
                  alt="Dropdown icon"
                  className={styles.dropdownIcon}
                />
              </button>
              {dropdownOpen && (
                <div className={styles.dropdownContent}>
                  {options.map((option, index) => (
                    <a key={index} onClick={() => handleOptionClick(option)}>
                      {option}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <h5>{task.title}</h5>

          <div className={styles.checklistSec}>
            <div className={styles.checkHeading}>
              <span>Checklist</span> <span>({Object.values(formData).filter(Boolean).length}/{task.checklist.length})</span>
            </div>
            {/* Toggle button */}
            <button
              className={styles.collapsible}
              onClick={handleToggleChecklist}
            >
              <img
                className={styles.toggleBtn}
                src={
                  isChecklistVisible
                    ? "./images/main/up.png"
                    : "./images/main/down.png"
                }
                alt="Toggle Icon"
              />
            </button>
          </div>

          {/* Collapsible Checklist (Initially Open) */}
          <div
            className={styles.content}
            style={{
              maxHeight: isChecklistVisible ? "500px" : "0",
              overflow: "hidden",
              transition: "max-height 0.8s ease-in-out",
            }}
          >
            {task.checklist.map((item, index) => (
              <div key={index} className={styles.checklistBlock}>
                <input
                  type="checkbox"
                  id={`task${index}`}
                  name={`task${index}`}
                  checked={formData[`task${index}`] || false}
                  onChange={handleChange}
                />
                <label htmlFor={`task${index}`}>{item}</label>
              </div>
            ))}
          </div>

          <div className={styles.checklistFooter}>
            <div className={`${styles.check} date`}>
              <button>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Due Date"}</button>
            </div>
            <div className={styles.checkProgress}>
              <button>PROGRESS</button>
              <button>TO-DO</button>
              <button>DONE</button>
            </div>
          </div>
        </div>
      )}
      {/* ====== Hero Section End ====== */}
    </>
  );
};

export default HeroBlock;
