import { useParams } from "react-router-dom"; // Import useParams
import { getSingleTask } from "../services/task";
import styles from "./HeroShortBlock.module.css";
import { useEffect, useState } from "react";

const HeroShortBlock = () => {
  const [task, setTask] = useState([]);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await getSingleTask(id);
        if (res.status === 200) setTask(res.data);
        else {
          alert("asd");
        }
      } catch (error) {
        console.error("Error fetching task: ", error);
      }
    };
    fetchTask();
  }, []);
  console.log(task);

  return (
    <>
    <div className={styles.customBox}>
        <div className={styles.taskBlock}>
          <div className={styles.taskHeading}>
      <div key={id} className={styles.heroSecBlock}>
        <div className={styles.prioritySec}>
          <span>{task.priority.toUpperCase()} PRIORITY</span>
          <div className={`${styles.dropdown} threeDots`}>
            <button className={styles.dropbtn}>
              <img
                src="../../images/main/dots.png"
                alt="Dropdown icon"
                className={styles.dropdownIcon}
              />
            </button>
            <div className={styles.dropdownContent}></div>
          </div>
        </div>

        <h5>{task.title}</h5>

        <div className={styles.checklistSec}>
          <div className={styles.checkHeading}>
            <span>Checklist</span>
            <span>
              ({task.checklist ? task.checklist.filter(Boolean).length : 0}/
              {task.checklist ? task.checklist.length : 0})
            </span>
          </div>
          <button className={styles.collapsible}>
            <img
              className={styles.toggleBtn}
              src={"../../images/main/up.png"}
              alt="Toggle Icon"
            />
          </button>
        </div>

        <div
          className={styles.content}
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
                  id={`task${index}`}
                  name={`task${index}`}
                  checked={item.checked || false}
                />
                <label htmlFor={`task${index}`}>{item.text}</label>
              </div>
            ))}
        </div>

        <div className={styles.checklistFooter}>
          <div className={`${styles.check} date`}>
            <button>
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "No Due Date"}
            </button>
          </div>
          <div className={styles.checkProgress}>
            <button>PROGRESS</button>
            <button>TO-DO</button>
            <button>DONE</button>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>

      {/* <div className={styles.customBox}>
        <div className={styles.taskBlock}>
          <div className={styles.taskHeading}>
            <div className={styles.heroSecBlock}>
              <div className={styles.prioritySec}>
                <span>HIGH PRIORITY</span>
                <img src="../../images/main/dots.png" alt="dots" />
              </div>
              <h5>{task.title}</h5>
              <div className={styles.checklistSec}>
                <div className={styles.checkHeading}>
                  <span>Checklist</span> <span>(0/3)</span>
                </div>
                <img src="../../images/main/up.png" alt="up" />
              </div>
              <div className={styles.checklistFooter}>
                <div className={`${styles.check} date`}>
                  <button>{task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "No Due Date"}</button>
                </div>
                <div className={styles.checkProgress}>
                  <button>PROGRESS</button>
                  <button>TO-DO</button>
                  <button>DONE</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default HeroShortBlock;
