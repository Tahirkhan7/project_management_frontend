import { useState } from "react";
import styles from "./Dashboard.module.css";
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import HeroBlock from '../../components/HeroBlock';
import CheckList from '../../components/CheckList';
import AssignEmail from '../../components/AssignEmail';
// import { useModal } from '../../model/ModalContext';

export default function Dashboard() {

  // const { isModalOpen, closeModal } = useModal(); // For logout modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // For add modal

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const [formData, setFormData] = useState({
    task1: false,
    task2: false,
    task3: false,
  });

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
  };

  const [inputType, setInputType] = useState('text');

  const handleFocus = () => {
    setInputType('date'); // Change to 'date' when focused
  };

  const handleBlur = () => {
    setInputType('text'); // Revert back to 'text' when focus is lost
  };

  const handleClick = (event) => {
    event.target.showPicker(); // Force open the date picker on click
  };
  return (
    <>
      <header className={styles.headerMain}>
        <div className={styles.headerContent}>
          <h5>Welcome! Kumar</h5>
          <p>12th Jan, 2024</p>
        </div>
      </header>

      <Breadcrumb pageName="Board" filter={true} addPeople={true} />

      {/* Calendar Section Start */}
      <div className={styles.customBox}>
        <div className={styles.taskBlock}>
          <div className={styles.taskHeading}>
            <h6>Backlog</h6>
            <img src="./images/main/collapse.png" alt="Collapse" />
          </div>
          <HeroBlock />
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
      {/* Calendar Section End */}

      {/* Logout Modal */}
      {/* <div id="logoutModal" className={`w3Modal ${isModalOpen ? "show" : ""}`}>
        <div className={styles.w3ModalContent}w3Card4">
          <header className={styles.w3Container}w3Teal">
            <h2>Are you sure you want to Logout?</h2>
          </header>
          <div className={styles.w3Container}>
            <div className={styles.formFooter}>
              <button type="button" className={styles.yesLogOut}button">
                Yes, Logout
              </button>
              <button type="button" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Add Task Modal */}
      {/* <div id="addModal" className={`w3Modal ${isAddModalOpen ? "show" : ""}`}>
        <div className={`${styles.w3ModalContent} w3Card4`}>
          <header className={`${styles.w3Container} w3Teal`}>
            <h6>
              Title<span>*</span>
            </h6>
            <input
              type="text"
              className={styles.enterTask}
              placeholder="Enter Task Title"
            />
            <div className={styles.selectCategorySec}>
              <h6>
                Select Priority<span>*</span>
              </h6>
              <button className={styles.priBtn1}>HIGH PRIORITY</button>
              <button className={styles.priBtn2}>MODERATE PRIORITY</button>
              <button className={styles.priBtn3}>LOW PRIORITY</button>
            </div>
            <div className={styles.assignSec}>
              <h6>Assign to</h6>
              <div className={styles.assignEmailSec}>
                <input
                  type="email"
                  className={styles.assignEmail}
                  placeholder="Add an assignee"
                />
                <div className={styles.assignDrpdown}>
                  <AssignEmail />
                  <AssignEmail />
                  <AssignEmail />
                  <AssignEmail />
                  <AssignEmail />
                </div>
              </div>
            </div>
            <div className={`${styles.model} checklist`}>
              <h6>
                Checklist (0/0)<span>*</span>
              </h6>
            </div>
          </header>
          <div className={styles.modalMain}>
            <div className={styles.addNewTaskSec}>
              <CheckList />
              <CheckList />
              <CheckList />
              <CheckList />
              <CheckList />
            </div>
            <button>
              <img src="./images/main/add.png" alt="Add" />
              Add New
            </button>
          </div>
          <div className={`${styles.w3Container} modalFooter`}>
            <div className={styles.formFooter}>
              <div className={styles.selectDate}>
                <input
                  type={inputType}
                  placeholder="Select Due Date"
                  className={styles.textboxN}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onClick={handleClick}
                  id="date"
                />
              </div>
              <div className={styles.footerBlock}>
                <button
                  type="button"
                  onClick={closeAddModal}
                  className={`${styles.yesAdd} button`}
                >
                  Cancel
                </button>
                <button type="submit" className={`${styles.save}button`}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
