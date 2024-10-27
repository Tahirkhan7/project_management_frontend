import { useContext, useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { AppContext } from "../../context/AppContext";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import HeroBlock from "../../components/HeroBlock";
import CheckList from "../../components/CheckList";
import AssignEmail from "../../components/AssignEmail";
import { useModal } from "../../model/ModalContext";
import { useNavigate } from "react-router-dom";
import formatDateAndTime from "../../utils/formatDateAndTime";
import { addTask, getAllTask } from "../../services/task";
import { getAllUsers } from "../../services/auth";

export default function Dashboard() {
  const [isAllcheckListVisible, setIsAllcheckListVisible] = useState(true);
  const navigate = useNavigate();
  const date = formatDateAndTime();
  const { username, email, boardId, logout } = useContext(AppContext);
  const { isModalOpen, closeModal } = useModal();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [tasks, setTasks] = useState([]);
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
    const fetchTasks = async () => {
      try {
        const taskData = await getAllTask(email);
        if (taskData.status === 200) {
          setTasks(taskData.data);
        }
      } catch (error) {
        console.error("Error fetching tasks or users:", error);
      }
    };

    if (email) {
      fetchTasks();
    }
  }, [email]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await getAllUsers(email);
      if (res.status === 200) {
        setMembers(res.data);
      }
      console.log(members);
    };

    if (email) {
      getUsers();
    }
  }, [email]);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

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
    if (errorMessages[field].isValid(value)) {
      setError((prevError) => ({ ...prevError, [field]: false }));
    }
  };

  const handleTaskSubmit = async (event) => {
    event.preventDefault();
    const { title, assignedTo, dueDate } = event.target;

    const formValues = {
      title: title.value,
      priority: selectedPriority,
      checklist: checklists,
    };

    if (!validateForm(formValues)) return;

    const data = {
      title: title.value,
      priority: selectedPriority,
      assignedTo: assignedTo.value || email,
      checklist: checklists,
      boardId: boardId,
      dueDate: dueDate.value || "",
    };

    try {
      const res = await addTask(data);
      if (res.status === 201) {
        closeAddModal();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
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

  const handleChecklistShow = () => {
    setIsAllcheckListVisible(!isAllcheckListVisible);
  };

  const handlePrioritySelect = (priority, event) => {
    event.preventDefault();
    setSelectedPriority(priority);
    error.priority = "";
  };

  const updateTaskCategory = (taskId, newCategory) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, category: newCategory } : task
      )
    );
  };

  const handleAssignTo = (event, email) => {
    event.preventDefault();
    setSelectedEmail(email);
  };

  return (
    <>
      <header className={styles.headerMain}>
        <div className={styles.headerContent}>
          <h5>Welcome! {username}</h5>
          <p>{date.date}</p>
        </div>
      </header>

      <Breadcrumb pageName="Board" filter={true} addPeople={true} />

      <div className={styles.customBox}>
        <div className={styles.taskBlock}>
          <div className={styles.taskHeading}>
            <h6>Backlog</h6>
            <img
              src="./images/main/collapse.png"
              alt="Collapse"
              onClick={handleChecklistShow}
            />
          </div>
          {tasks
            .filter((task) => task.category === "backlog")
            .map((task) => (
              <HeroBlock
                key={task._id}
                task={task}
                isAllcheckListVisible={isAllcheckListVisible}
                updateTaskCategory={updateTaskCategory}
              />
            ))}
        </div>
        <div className={styles.taskBlock}>
          <div className={styles.taskHeading}>
            <h6>To do</h6>
            <div className={styles.addSec}>
              <button onClick={openAddModal}>
                <img src="./images/main/add.png" alt="Add" />
              </button>
              <img src="./images/main/collapse.png" alt="Collapse" />
            </div>
          </div>
          {tasks
            .filter((task) => task.category === "to-do")
            .map((task) => (
              <HeroBlock
                key={task._id}
                task={task}
                isAllcheckListVisible={isAllcheckListVisible}
                updateTaskCategory={updateTaskCategory}
              />
            ))}
        </div>
        <div className={styles.taskBlock}>
          <div className={styles.taskHeading}>
            <h6>In progress</h6>
            <img src="./images/main/collapse.png" alt="Collapse" />
          </div>
          {tasks
            .filter((task) => task.category === "in-progress")
            .map((task) => (
              <HeroBlock
                key={task._id}
                task={task}
                isAllcheckListVisible={isAllcheckListVisible}
                updateTaskCategory={updateTaskCategory}
              />
            ))}
        </div>
        <div className={styles.taskBlock}>
          <div className={styles.taskHeading}>
            <h6>Done</h6>
            <img src="./images/main/collapse.png" alt="Collapse" />
          </div>
          {tasks
            .filter((task) => task.category === "done")
            .map((task) => (
              <HeroBlock
                key={task._id}
                task={task}
                isAllcheckListVisible={isAllcheckListVisible}
                updateTaskCategory={updateTaskCategory}
              />
            ))}
        </div>
      </div>

      <div id="logoutModal" className={`w3Modal ${isModalOpen ? "show" : ""}`}>
        <div className={`w3ModalContent w3Card4`}>
          <header className={`w3Container w3Teal`}>
            <h2>Are you sure you want to Logout?</h2>
          </header>
          <div className={`w3Container`}>
            <div className={`formFooter`}>
              <button
                type="button"
                onClick={handleLogout}
                className={`yesLogOut button`}
              >
                Yes, Logout
              </button>
              <button type="button" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleTaskSubmit}>
        <div
          id="addModal"
          className={`w3Modal ${isAddModalOpen ? "show" : ""}`}
        >
          <div
            className={`w3ModalContent w3Card4 `}
            style={{
              height:
                error.title || error.priority || error.checklist
                  ? "700px"
                  : "620px",
            }}
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
              <input
                type="text"
                name="title"
                className={`enterTask`}
                placeholder="Enter Task Title"
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
                    value={selectedEmail}
                    readOnly
                    className={`assignEmail`}
                    placeholder="Add an assignee"
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
                    {/* {members.map((member) => ( */}
                    {/* // <AssignEmail key={member._id} member={member.email} /> */}
                    {/* <AssignEmail members={members} /> */}
                    {/* // ))} */}
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
                    onClick={closeAddModal}
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
    </>
  );
}
