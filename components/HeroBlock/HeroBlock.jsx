/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useContext, useRef } from "react";
import styles from "./HeroBlock.module.css";
import { deleteTask, getSingleTask, updateTask } from "../../services/task";
import { AppContext } from "../../context/AppContext";
import CheckList from "../CheckList";
import { getAllUsers } from "../../services/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeroBlock = ({ id, task, isAllcheckListVisible, updateTaskCategory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChecklistVisible, setIsChecklistVisible] = useState(
    isAllcheckListVisible
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(
    task.category || "to-do"
  );

  const { email, boardId, logout, setCopyLink } = useContext(AppContext);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState({
    title: "",
    assignedTo: "",
    dueDate: "",
  });

  const [members, setMembers] = useState([]);
  const [checklists, setChecklists] = useState([]);
  const [newChecklistText, setNewChecklistText] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [error, setError] = useState({
    title: false,
    priority: false,
    checklist: false,
  });

  useEffect(() => {
    const getUsers = async () => {
      const res = await getAllUsers(email);
      if (res.status === 200) {
        setMembers(res.data);
      }
    };

    if (email) {
      getUsers();
    }
  }, [email]);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        if (isModalOpen) {
          setDropdownOpen(false);
          closeModal();
        }
        if (isEditModalOpen) {
          setDropdownOpen(false);
          closeEditModal();
        }

        if (dropdownOpen) {
          setDropdownOpen(false);
        }
      }
    };

    const isAnyModalOpen = isModalOpen || isEditModalOpen || dropdownOpen;

    if (isAnyModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, dropdownOpen]);

  const handleAddChecklist = () => {
    if (newChecklistText.trim()) {
      setChecklists([
        ...checklists,
        { text: newChecklistText, isChecked: false },
      ]);
      setNewChecklistText("");
      error.checklist = "";
    }
  };

  const handleToggleCheck = (index) => {
    setChecklists((prevChecklists) =>
      prevChecklists.map((item, i) =>
        i === index ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const handleDeleteChecklist = (index) => {
    setChecklists((prevChecklists) =>
      prevChecklists.filter((_, i) => i !== index)
    );
  };

  const errorMessages = {
    title: {
      message: "Title is required",
      isValid: (value) => value.length > 0,
      onError: () => {
        setError((error) => ({ ...error, title: true }));
      },
    },
    priority: {
      message: "Priority is required",
      isValid: (value) => value && value.length > 0,
      onError: () => {
        setError((error) => ({ ...error, priority: true }));
      },
    },
    checklist: {
      message: "Add at least 1 Checklist",
      isValid: (value) => value && value.length > 0,
      onError: () => {
        setError((error) => ({ ...error, checklist: true }));
      },
    },
  };

  const validateForm = (formValues) => {
    let valid = true;
    Object.keys(errorMessages).forEach((field) => {
      if (!errorMessages[field].isValid(formValues[field])) {
        errorMessages[field].onError();
        valid = false;
      }
    });
    return valid;
  };

  const handleInputChange = (field, value) => {
    setEditTask((prevTask) => ({
      ...prevTask,
      [field]: value,
    }));

    if (errorMessages[field].isValid(value)) {
      setError((prevError) => ({ ...prevError, [field]: false }));
    }
  };

  const handleEditTaskSubmit = async (event) => {
    event.preventDefault();
    const { _id, title, assignedTo, dueDate } = event.target;

    const formValues = {
      title: title.value,
      assignedTo: assignedTo.value || email,
      priority: selectedPriority,
      checklist: checklists,
    };

    if (!validateForm(formValues)) return;

    const data = {
      _id: _id.value,
      title: title.value,
      priority: selectedPriority,
      assignedTo: assignedTo.value || email,
      checklist: checklists,
      boardId: boardId,
      dueDate: dueDate.value || "",
    };

    try {
      const res = await updateTask(data);
      if (res.status === 200) {
        toast.success(res.data.message);
        event.target.reset();
        setSelectedPriority(null);
        setChecklists([]);
        setSelectedEmail("");
        closeEditModal();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [inputType, setInputType] = useState("text");

  const handleFocus = () => {
    setInputType("date");
  };

  const handleBlur = () => {
    setInputType("text");
  };

  const handleClick = (event) => {
    event.target.showPicker();
  };

  const handlePrioritySelect = (priority, event) => {
    event.preventDefault();
    setSelectedPriority(priority);
    error.priority = "";
  };

  const handleAssignTo = (event, email) => {
    event.preventDefault();
    setEditTask((prevTask) => ({
      ...prevTask,
      assignedTo: email,
    }));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDropdownOpen(false);
  };

  const openEditModal = (id) => {
    const fetchTask = async () => {
      const res = await getSingleTask(id);
      if (res.status === 200) {
        setEditTask(res.data);
        setSelectedPriority(res.data.priority);
        setChecklists(res.data.checklist);
      }
      setIsEditModalOpen(true);
    };
    fetchTask();
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const [formData, setFormData] = useState(
    task.checklist.reduce((acc, item, index) => {
      acc[`task${index}`] = item.isChecked;
      return acc;
    }, {})
  );

  useEffect(() => {
    setIsChecklistVisible(isAllcheckListVisible);
  }, [isAllcheckListVisible]);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevData) => {
      const updatedFormData = {
        ...prevData,
        [name]: checked,
      };

      const updatedChecklist = task.checklist.map((item, index) => ({
        text: item.text,
        isChecked: updatedFormData[`task${index}`],
      }));

      const data = {
        ...task,
        checklist: updatedChecklist,
      };

      updateTaskStatus(data);

      return updatedFormData;
    });
  };

  const updateTaskStatus = async (data) => {
    try {
      await updateTask(data);
    } catch (error) {
      console.error("Error updating checklist: ", error);
    }
  };

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setDropdownOpen((prevState) => !prevState);
  };

  const handleStatusChange = async (category) => {
    setActiveCategory(category);
    const updatedTask = { ...task, category };

    try {
      await updateTask(updatedTask);
      console.log("Status updated successfully", updatedTask);

      updateTaskCategory(task._id, category);
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  const handleTaskDelete = async (id) => {
    try {
      const res = await deleteTask(id);
      if (res.status === 200) {
        closeModal();
        toast.success(res.data.message, {
          autoClose: 1000,
        });
      } else {
        closeModal();
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        closeModal();
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
        closeModal();
      }
    }
  };

  const handleShare = async (event, id) => {
    const linkToShare = `https://project-management-gdzw.onrender.com/task/view/${id}`;
    try {
      await navigator.clipboard.writeText(linkToShare);
      setCopyLink(linkToShare);
      closeModal();
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  return (
    <>
      <form onSubmit={handleEditTaskSubmit}>
        <div
          id="addModal"
          className={`w3Modal ${isEditModalOpen ? "show" : ""}`}
        >
          <div
            className={`w3ModalContent w3Card4 `}
            style={{
              height:
                error.title || error.priority || error.checklist
                  ? "700px"
                  : "620px",
            }}
            ref={modalRef}
          >
            <header className={`w3Container w3Teal`}>
              <h6>
                Title<span>*</span>
              </h6>
              {error.title && (
                <span className={styles.errorMsge}>
                  {errorMessages.title.message}
                </span>
              )}
              <input type="hidden" name="_id" value={editTask._id} />
              <input
                type="text"
                name="title"
                className={`enterTask`}
                placeholder="Enter Task Title"
                value={editTask.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />

              {error.priority && (
                <span className={styles.errorMsge}>
                  {errorMessages.priority.message}
                </span>
              )}
              <div className={`selectCategorySec`}>
                <h6>
                  Select Priority<span>*</span>
                </h6>

                <button
                  className={`priBtn1 ${
                    selectedPriority === "high" ? "active" : ""
                  }`}
                  onClick={(e) => handlePrioritySelect("high", e)}
                >
                  HIGH PRIORITY
                </button>
                <button
                  className={`priBtn2 ${
                    selectedPriority === "moderate" ? "active" : ""
                  }`}
                  onClick={(e) => handlePrioritySelect("moderate", e)}
                >
                  MODERATE PRIORITY
                </button>
                <button
                  className={`priBtn3 ${
                    selectedPriority === "low" ? "active" : ""
                  }`}
                  onClick={(e) => handlePrioritySelect("low", e)}
                >
                  LOW PRIORITY
                </button>
              </div>
              <div className={`assignSec`}>
                <h6>Assign to</h6>
                <div className={`assignEmailSec`}>
                  <input
                    type="email"
                    name="assignedTo"
                    value={editTask.assignedTo}
                    className={`assignEmail`}
                    placeholder="Add an assignee"
                    onChange={(e) =>
                      handleInputChange("assignedTo", e.target.value)
                    }
                  />
                  <div className={`assignDrpdown`}>
                    {members &&
                      members.map((member) => (
                        <div className="assignEmailBlock" key={member._id}>
                          <div className="setAssignBlock">
                            <div className="assignEmailName">
                              {member.name
                                .split(" ")
                                .slice(0, 2)
                                .map((word) => word[0])
                                .join("")
                                .toUpperCase()}
                            </div>
                            <p>{member.email}</p>
                          </div>
                          <button
                            onClick={(e) => handleAssignTo(e, member.email)}
                          >
                            Assign
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className={`model checklist`}>
                <h6>
                  Checklist (
                  {
                    checklists.filter(
                      (checklist) => checklist.isChecked === true
                    ).length
                  }
                  /{checklists.length})<span>*</span>
                  {error.checklist && (
                    <span className={styles.errorMsge}>
                      {errorMessages.checklist.message}
                    </span>
                  )}
                  <input
                    className={`checkListInput`}
                    type="text"
                    name="checklistInput"
                    value={newChecklistText}
                    onChange={(e) => setNewChecklistText(e.target.value)}
                    placeholder="Enter checklist item"
                  />
                </h6>
              </div>
            </header>
            <div className={`modalMain`}>
              <div className={`addNewTaskSec`}>
                {checklists.map((item, index) => (
                  <CheckList
                    key={index}
                    text={item.text}
                    checked={item.isChecked}
                    onCheckToggle={() => handleToggleCheck(index)}
                    onDelete={() => handleDeleteChecklist(index)}
                  />
                ))}
              </div>

              <button type="button" onClick={handleAddChecklist}>
                <img src="./images/main/add.png" alt="Add" />
                Add New
              </button>
            </div>
            <div className={`w3Container modalFooter`}>
              <div className={`formFooter`}>
                <div className={`selectDate`}>
                  <input
                    type={inputType}
                    value={editTask.dueDate ? new Date(editTask.dueDate) : ""}
                    name="dueDate"
                    placeholder="Select Due Date"
                    className={`textboxN`}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onClick={handleClick}
                    id="date"
                  />
                </div>
                <div className={`footerBlock`}>
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className={`yesAdd button`}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={`save button`}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div
        id="deleteTaskModal"
        className={`w3Modal ${isModalOpen ? "show" : ""}`}
      >
        <div className={`w3ModalContent w3Card4`} ref={modalRef}>
          <header className={`w3Container w3Teal`}>
            <h2>Are you sure you want to Delete?</h2>
          </header>
          <div className={`w3Container`}>
            <div className={`formFooter`}>
              <button
                type="button"
                onClick={() => handleTaskDelete(task._id)}
                className={`yesLogOut button`}
              >
                Yes, Delete
              </button>
              <button type="button" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {task && (
        <div key={id} className={styles.heroSecBlock}>
          <div className={styles.prioritySec}>
            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
              <div
                style={{
                  backgroundColor:
                    task.priority === "high"
                      ? "#FF2473"
                      : task.priority === "low"
                      ? "#63C05B"
                      : "#18B0FF",
                  height: "10px",
                  width: "10px",
                  borderRadius: "50%",
                }}
              ></div>

              <h6>{task.priority.toUpperCase()} PRIORITY</h6>
            </div>
            <div className={`${styles.dropdown} threeDots`}>
              <button className={styles.dropbtn} onClick={toggleDropdown}>
                <img
                  src="./images/main/dots.png"
                  alt="Dropdown icon"
                  className={styles.dropdownIcon}
                />
              </button>
              {dropdownOpen && (
                <div className={styles.dropdownContent} ref={modalRef}>
                  <a onClick={() => openEditModal(task._id)}>Edit</a>
                  <a onClick={(e) => handleShare(e, task._id)}>Share</a>
                  <a onClick={openModal}>Delete</a>
                </div>
              )}
            </div>
          </div>

          <div className={styles.tooltip}>
          {task.title.length > 20 ? `${task.title.slice(0, 20)}...` : task.title}
            {task.title.length > 20 && <span className={styles.tooltipText}>{task.title}</span>}
          </div>

          <div className={styles.checklistSec}>
            <div className={styles.checkHeading}>
              <span>Checklist</span>
              <span>
                ({Object.values(formData).filter(Boolean).length}/
                {task.checklist.length})
              </span>
            </div>
            <button
              className={styles.collapsible}
              onClick={() => setIsChecklistVisible(!isChecklistVisible)}
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
                  className={styles.task}
                />
                <label htmlFor={`task${index}`}>{item.text}</label>
              </div>
            ))}
          </div>

          <div className={styles.checklistFooter}>
            <div className={`${styles.check} date`}>
              {task.dueDate != null && (
                <button
                  style={{
                    backgroundColor: (() => {
                      const today = new Date();
                      const dueDate = new Date(task.dueDate);

                      if (task.category === "done" && task.dueDate != null) {
                        return "#63C05B";
                      } else if (task.dueDate && dueDate > today) {
                        return "#DBDBDB";
                      } else {
                        return "#CF3636";
                      }
                    })(),
                    color: (() => {
                      const today = new Date();
                      const dueDate = new Date(task.dueDate);

                      if (task.dueDate && dueDate < today) {
                        return "#FFFFFF";
                      } else {
                        return "#5A5A5A";
                      }
                    })(),
                  }}
                >
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "No Due Date"}
                </button>
              )}
            </div>
            <div className={styles.checkProgress}>
              <button
                className={
                  activeCategory === "in-progress" ? styles.activeButton : ""
                }
                onClick={() => handleStatusChange("in-progress")}
              >
                PROGRESS
              </button>
              <button
                className={
                  activeCategory === "to-do" ? styles.activeButton : ""
                }
                onClick={() => handleStatusChange("to-do")}
              >
                TO-DO
              </button>
              <button
                className={activeCategory === "done" ? styles.activeButton : ""}
                onClick={() => handleStatusChange("done")}
              >
                DONE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroBlock;
