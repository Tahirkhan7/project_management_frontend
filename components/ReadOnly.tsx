import React, { useState } from 'react';
import Dots from '../images/main/dots.png';
import Up from '../images/main/up.png';
import Down from '../images/main/down.png';


const ReadOnly = () => {

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

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setDropdownOpen(false); // Close dropdown after selection
  };


  return (
    <>
      {/* ====== Hero Section Start ====== */}
      <div className="heroSecBlock view-mode">
        <div className="prioritySec">
          <span>HIGH PRIORITY</span>
        </div>

        <h5>Hero section</h5>

        <div className="checklistSec">
          <div className="checkHeading">
            <span>Checklist</span> <span>(0/3)</span>
          </div>
        </div>

        {/* Collapsible Checklist (Initially Open) */}
        <div
          className="content"
          style={{
            maxHeight: isChecklistVisible ? '500px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.8s ease-in-out',
          }}
        >
          <div className="checklistBlock">
            <input
              type="checkbox"
              id="task1"
              name="task1"
              checked={formData.task1}
              onChange={handleChange}
            />
            <label htmlFor="task1">Task to be done</label>
          </div>
          <div className="checklistBlock">
            <input
              type="checkbox"
              id="task2"
              name="task2"
              checked={formData.task2}
              onChange={handleChange}
            />
            <label htmlFor="task2">Task to be done</label>
          </div>
          <div className="checklistBlock">
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

        <div className="checklistFooter">
          <div className="check-date new">
            <button className='due-date'>Due Date</button>
            <button>Feb 10th</button>
          </div>
        </div>
      </div>
      {/* ====== Hero Section End ====== */}
    </>
  );
};

export default ReadOnly;
