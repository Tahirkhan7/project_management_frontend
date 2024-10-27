import React, { useState } from 'react';

const CheckList = () => {

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
            <img src="./images/main/Delete.png" />
          </div>
        </div>
      {/* ====== Hero Section End ====== */}

    </>
  );
};

export default CheckList;
