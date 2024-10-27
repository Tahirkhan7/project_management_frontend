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
  const navigate = useNavigate();
  const date = formatDateAndTime();
  const { username, email, boardId, logout } = useContext(AppContext);
  const { isModalOpen, closeModal } = useModal();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchTasksAndUsers = async () => {
      try {
        const taskData = await getAllTask(email);
        setTasks(taskData);

        const userData = await getAllUsers();
        setMembers(userData.data);
      } catch (error) {
        console.error("Error fetching tasks or users:", error);
      }
    };

    if (email) {
      fetchTasksAndUsers();
    }
  }, [email]);

  const [checklists, setChecklists] = useState([]);
  const [newChecklistText, setNewChecklistText] = useState("");

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const handleAddChecklist = () => {
    if (newChecklistText.trim()) {
      setChecklists([...checklists, newChecklistText]);
      setNewChecklistText("");
    }
  };

  const handleTaskSubmit = async (event) => {
    event.preventDefault();
    const { title, assignedTo, dueDate } = event.target;
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
      console.log(res);
      if (res.status === 201) {
        closeAddModal();
      }
    } catch (error) {
      console.error("errrrr: ", error);
      // if (error.response && error.response.status === 400) {
      //   setError((prevError) => ({
      //     ...prevError,
      //     registerError: error.response.data.message,
      //   }));
      // } else {
      //   setError((prevError) => ({
      //     ...prevError,
      //     registerError: "An unexpected error occurred!",
      //   }));
      // }
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

  const handlePrioritySelect = (priority) => {
    setSelectedPriority(priority);
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
            <img src="./images/main/collapse.png" alt="Collapse" />
          </div>
          {tasks
            .filter((task) => task.category === "to-do")
            .map((task) => (
              <HeroBlock key={task._id} task={task} />
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
          <HeroBlock />
        </div>
        <div className={styles.taskBlock}>
          <div className={styles.taskHeading}>
            <h6>In progress</h6>
            <img src="./images/main/collapse.png" alt="Collapse" />
          </div>
          <HeroBlock />
        </div>
        <div className={styles.taskBlock}>
          <div className={styles.taskHeading}>
            <h6>Done</h6>
            <img src="./images/main/collapse.png" alt="Collapse" />
          </div>
          <HeroBlock />
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
          <div className={`w3ModalContent w3Card4`}>
            <header className={`w3Container w3Teal`}>
              <h6>
                Title<span>*</span>
              </h6>
              <input
                type="text"
                name="title"
                className={`enterTask`}
                placeholder="Enter Task Title"
              />
              <div className={`selectCategorySec`}>
                <h6>
                  Select Priority<span>*</span>
                </h6>

                <button
                  className={`priBtn1 ${
                    selectedPriority === "high" ? "active" : ""
                  }`}
                  onClick={() => handlePrioritySelect("high")}
                >
                  HIGH PRIORITY
                </button>
                <button
                  className={`priBtn2 ${
                    selectedPriority === "moderate" ? "active" : ""
                  }`}
                  onClick={() => handlePrioritySelect("moderate")}
                >
                  MODERATE PRIORITY
                </button>
                <button
                  className={`priBtn3 ${
                    selectedPriority === "low" ? "active" : ""
                  }`}
                  onClick={() => handlePrioritySelect("low")}
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
                    className={`assignEmail`}
                    placeholder="Add an assignee"
                  />
                  <div className={`assignDrpdown`}>
                    {/* {members.map((member) => ( */}
                      {/* // <AssignEmail key={member._id} member={member.email} /> */}
                      <AssignEmail members={members} />
                    {/* // ))} */}
                  </div>
                </div>
              </div>
              <div className={`model checklist`}>
                <h6>
                  Checklist ({checklists.length}/{checklists.length})
                  <span>*</span>
                  <input
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
                {checklists.map((text, index) => (
                  <CheckList key={index} text={text} />
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
