import { useState } from 'react';
import styles from "./HeroBlock.module.css";

const HeroBlock = () => {

  const [formData, setFormData] = useState({
    task1: false,
    task2: false,
    task3: false,
  });

  const [isChecklistVisible, setIsChecklistVisible] = useState(true); // Toggle checklist visibility
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown open/close state

  // Array of dropdown options
  const options = ['Edit', 'Share', 'Delete'];

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
      <div className={styles.heroSecBlock}>
        <div className={styles.prioritySec}>
          <span>HIGH PRIORITY</span>
          {/* Dropdown for filter */}
          <div className={`${styles.dropdown} threeDots`}>
            <button className={styles.dropbtn} onClick={toggleDropdown}>
              <img src="./images/main/dots.png" alt="Dropdown icon" className={styles.dropdownIcon} />
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

        <h5>Hero section</h5>

        <div className={styles.checklistSec}>
          <div className={styles.checkHeading}>
            <span>Checklist</span> <span>(0/3)</span>
          </div>
          {/* Toggle button */}
          <button className={styles.collapsible} onClick={handleToggleChecklist}>
            <img
              className={styles.toggleBtn}
              src={isChecklistVisible ? "./images/main/up.png" : "./images/main/down.png"} // Switch icon based on visibility
              alt="Toggle Icon"
            />
          </button>
        </div>

        {/* Collapsible Checklist (Initially Open) */}
        <div
          className={styles.content}
          style={{
            maxHeight: isChecklistVisible ? '500px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.8s ease-in-out',
          }}
        >
          <div className={styles.checklistBlock}>
            <input
              type="checkbox"
              id="task1"
              name="task1"
              checked={formData.task1}
              onChange={handleChange}
            />
            <label htmlFor="task1">Task to be done</label>
          </div>
          <div className={styles.checklistBlock}>
            <input
              type="checkbox"
              id="task2"
              name="task2"
              checked={formData.task2}
              onChange={handleChange}
            />
            <label htmlFor="task2">Task to be done</label>
          </div>
          <div className={styles.checklistBlock}>
            <input
              type="checkbox"
              id="task3"
              name="task3"
              checked={formData.task3}
              onChange={handleChange}
            />
            <label htmlFor="task3">Task to be done</label>
          </div>
        </div>

        <div className={styles.checklistFooter}>
          <div className={`${styles.check} date`}>
            <button>Feb 10th</button>
          </div>
          <div className={styles.checkProgress}>
            <button>PROGRESS</button>
            <button>TO-DO</button>
            <button>DONE</button>
          </div>
        </div>
      </div>
      {/* ====== Hero Section End ====== */}


    </>
  );
};

export default HeroBlock;
