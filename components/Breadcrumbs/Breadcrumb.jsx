/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Breadcrumbs.module.css";
import { AppContext } from "../../context/AppContext";
import { getAllUsers } from "../../services/auth";
import { addMemberToBoard } from "../../services/board";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Breadcrumb = ({ pageName, filter, addPeople, onOptionSelect }) => {
  const { boardId, email, copiedLink } = useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("This Week");
  const [members, setMembers] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [error, setError] = useState("");
  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDoneAddPeopleModalOpen, setIsDoneAddPeopleModalOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onOptionSelect(option);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const getAllUsersData = async () => {
      const res = await getAllUsers(email);
      if (res.status === 200) {
        setMembers(res.data);
      }
    };
    if (email) getAllUsersData();
  }, [email]);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       closeModal();
  //     }
  //   };

  //   if (isModalOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isModalOpen]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const options = ["Today", "This Week", "This Month"];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setSelectedEmail("");
    openModal();
  };

  const handleAssignPeopleSubmit = async () => {
    if (!selectedEmail) {
      setError("Email is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(selectedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    const data = {
      id: boardId,
      email: selectedEmail,
    };

    try {
      const res = await addMemberToBoard(data);
      if (res.status === 200) {
        toast.success(res.data.message);
        closeModal();
        setIsDoneAddPeopleModalOpen(true);
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setError("An unexpected error occurred.");
        closeModal();
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleIsDoneAddPeopleModalOpen = () =>{
    setIsDoneAddPeopleModalOpen(false);
  }

  return (
    <>
      {copiedLink && (
        <div className={styles.linkCopied}>
          <p>Link Copied</p>
        </div>
      )}
      <div className={styles.headerSection}>
        <div className={styles.headerSectionBlock}>
          <h2 className={styles.pageTitle}>{pageName}</h2>
          {addPeople && (
            <button onClick={handleOpenModal}>
              <img src="./images/main/people.png" alt="Add People" /> Add People
            </button>
          )}
        </div>

        {filter && (
          <div className={styles.dropdown}>
            <button className={styles.dropbtn} onClick={toggleDropdown}>
              {selectedOption}
              <img
                src="./images/main/dropdown.png"
                alt="Dropdown icon"
                className={styles.dropdownIcon}
              />
            </button>
            {dropdownOpen && (
              <div className={styles.dropdownContent}>
                {options.map((option, index) => (
                  <a key={index} onClick={() => handleOptionClick(option)}>
                    {option}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        <div id="id01" className={`w3Modal ${isModalOpen ? "show" : ""}`}>
          <div className={`w3ModalContent w3Card4`} ref={modalRef}>
            <header className={`w3Container w3Teal`}>
              <h2>Add people to the board</h2>
            </header>
            {error && (
              <span className="errorMsge" style={{ color: "#DB371F" }}>
                {error}
              </span>
            )}
            <div className={`w3Container`}>
              <input
                type="email"
                id="femail"
                name="assignEmail"
                placeholder="Enter the email"
                onChange={(e) => {
                  setSelectedEmail(e.target.value);
                  if (error) setError("");
                }}
                required
              />
              <div className={`formFooter`}>
                <button type="button" onClick={closeModal}>
                  Cancel
                </button>
                <input
                  type="submit"
                  value="Add Email"
                  onClick={handleAssignPeopleSubmit}
                />
              </div>
            </div>
          </div>
        </div>

        <div id="id02" className={`w3Modal ${isDoneAddPeopleModalOpen ? "show" : ""}`}>
          <div className={`w3ModalContent w3Card4`} ref={modalRef}>
            <header className={`w3Container w3Teal`}>
              <h2 style={{ textAlign: "center" }}>{selectedEmail != "" && selectedEmail} added to board</h2>

            </header>
            <div className={`w3Container`}>
              <div className={`formFooter`}>
                <input
                  type="submit"
                  value="Okay, Got It"
                  onClick={handleIsDoneAddPeopleModalOpen}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Breadcrumb;
