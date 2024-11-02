import { useParams } from "react-router-dom";
import { getSingleTask } from "../../services/task";
import styles from "./ViewTask.module.css";
import { useEffect, useState } from "react";
import Logo from "../../public/images/logo/d-logo.png";

const ViewTask = () => {
  const [task, setTask] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await getSingleTask(id);
        if (res.status === 200) setTask(res.data);
      } catch (error) {
        console.error("Error fetching task: ", error);
      }
    };
    fetchTask();
  }, [id]);

  return (
    <div className={styles.layoutMain}>
      <aside className={styles.sidebarMain}>
        <div className={styles.logoSec}>
          <img src={Logo} alt="Logo" />
        </div>
      </aside>

      {task &&
      <div className={styles.customBox}>
        <div className={styles.taskBlock}>
          <div className={styles.taskHeading}>
            <div key={id} className={styles.heroSecBlock}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize:"15px" }}>
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

              <span><small>{task.priority ? task.priority.toUpperCase() : ''} PRIORITY</small></span>
            </div>

              <h5>{task.title}</h5>

              <div className={styles.checklistSec}>
                <div className={styles.checkHeading}>
                  <span>
                    <small>Checklist</small>
                  </span>
                  <span><small>
                    (
                    {task.checklist ? task.checklist.filter(task=>task.isChecked).length : 0}
                    /{task.checklist ? task.checklist.length : 0})
                    </small>
                  </span>
                </div>
              </div>

              <div
                className={styles.contentt}
                style={{
                  maxHeight: "500px",
                  overflow: "hidden",
                  transition: "max-height 0.8s ease-in-out",
                }}
              >
                {task.checklist &&
                  task.checklist.map((item, index) => (
                    <div key={index} className={styles.checklistBlock}>
                      <input
                        type="checkbox"
                        id={`task`}
                        name={`task${index}`}
                        checked={item.isChecked || false}
                        className={styles.task}
                      />
                      <label htmlFor={`task${index}`}>{item.text}</label>
                    </div>
                  ))}
              </div>

              <div className={styles.checklistFooter}>
              {task.dueDate && <div className={styles.date}>
                  <p><small>Due Date</small></p>
                  <button>
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "No Due Date"}
                  </button>
                </div> }
              </div>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default ViewTask;
