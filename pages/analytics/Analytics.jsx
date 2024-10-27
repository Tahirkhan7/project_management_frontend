import { useContext, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import styles from "./Analytics.module.css";
import { getAllTask } from "../../services/task";
import { AppContext } from "../../context/AppContext";

const Analytics = () => {
  const { email } = useContext(AppContext);

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
        backlog: result.filter((task) => task.category === "backlog").length,
        todo: result.filter((task) => task.category === "to-do").length,
        inprogress: result.filter((task) => task.category === "in-progress")
          .length,
        done: result.filter((task) => task.category === "done").length,
        high: result.filter((task) => task.priority === "high").length,
        moderate: result.filter((task) => task.priority === "moderate").length,
        low: result.filter((task) => task.priority === "low").length,
        dueDate: result.filter((task) => task.dueDate != null).length,
      });
    } catch (error) {
      console.error("Failed to fetch tasks details:", error);
    }
  };

  if (email) fetchData();

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
    </>
  );
};

export default Analytics;
