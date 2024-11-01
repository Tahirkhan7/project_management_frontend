import { useContext, useEffect, useRef, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import styles from "./Analytics.module.css";
import { getAllTask } from "../../services/task";
import { AppContext } from "../../context/AppContext";
import { useModal } from "../../model/ModalContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Analytics = () => {
  const { isModalOpen, closeModal } = useModal();
  const { email, logout } = useContext(AppContext);
  const modalRef = useRef(null);

  const [tasks, setTasks] = useState({
    backlog: 0,
    todo: 0,
    inprogress: 0,
    done: 0,
    high: 0,
    moderate: 0,
    low: 0,
    dueDate: 0,
  });

  const fetchData = async () => {
    try {
      const result = await getAllTask(email);
      
      setTasks({
        backlog: result.data.filter((task) => task.category === "backlog").length,
        todo: result.data.filter((task) => task.category === "to-do").length,
        inprogress: result.data.filter((task) => task.category === "in-progress")
          .length,
        done: result.data.filter((task) => task.category === "done").length,
        high: result.data.filter((task) => task.priority === "high").length,
        moderate: result.data.filter((task) => task.priority === "moderate").length,
        low: result.data.filter((task) => task.priority === "low").length,
        dueDate: result.data.filter((task) => task.dueDate != null).length,
      });
    } catch (error) {
      console.error("Failed to fetch tasks details:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        if (isModalOpen) {
          closeModal();
        }
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  if (email) fetchData();

  const handleLogout = () => {
    closeModal();
    logout();
  };

  return (
    <>
      <Breadcrumb pageName="Analytics" filter={false} addPeople={false} />

      {/* Calendar Section */}
      <div className={styles.customBox}>
        <div className={styles.analyticsBlock}>
          <div className={styles.analyticsTask}>
            <p className={styles.analyticsTaskText}>Backlog Tasks</p>
            <span className={styles.analyticsTaskCount}>{tasks.backlog}</span>
          </div>
          <div className={styles.analyticsTask}>
            <p className={styles.analyticsTaskText}>To-do Tasks</p>
            <span className={styles.analyticsTaskCount}>{tasks.todo}</span>
          </div>
          <div className={styles.analyticsTask}>
            <p className={styles.analyticsTaskText}>In-Progress Tasks</p>
            <span className={styles.analyticsTaskCount}>{tasks.inprogress}</span>
          </div>
          <div className={styles.analyticsTask}>
            <p className={styles.analyticsTaskText}>Completed Tasks</p>
            <span className={styles.analyticsTaskCount}>{tasks.done}</span>
          </div>
        </div>

        <div className={styles.analyticsBlock}>
          <div className={styles.analyticsTask}>
            <p className={styles.analyticsTaskText}>Low Priority</p>
            <span className={styles.analyticsTaskCount}>{tasks.low}</span>
          </div>
          <div className={styles.analyticsTask}>
            <p className={styles.analyticsTaskText}>Moderate Priority</p>
            <span className={styles.analyticsTaskCount}>{tasks.moderate}</span>
          </div>
          <div className={styles.analyticsTask}>
            <p className={styles.analyticsTaskText}>High Priority</p>
            <span className={styles.analyticsTaskCount}>{tasks.high}</span>
          </div>
          <div className={styles.analyticsTask}>
            <p className={styles.analyticsTaskText}>Due Date Tasks</p>
            <span className={styles.analyticsTaskCount}>{tasks.dueDate}</span>
          </div>
        </div>
      </div>
      <div id="logoutModal" className={`w3Modal ${isModalOpen ? "show" : ""}`}>
        <div className={`w3ModalContent w3Card4`} ref={modalRef}>
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
      <ToastContainer />
    </>
  );
};

export default Analytics;
