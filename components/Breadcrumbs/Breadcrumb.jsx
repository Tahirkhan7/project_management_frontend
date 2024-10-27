import { useContext, useEffect, useState } from "react";
import styles from "./Breadcrumbs.module.css";
import AssignEmail from "../AssignEmail";
import { AppContext } from "../../context/AppContext";
import { getAllUsers } from "../../services/auth";
import { addMemberToBoard } from "../../services/board";

// eslint-disable-next-line react/prop-types
const Breadcrumb = ({ pageName, filter, addPeople }) => {
  const { boardId, email } = useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("This Week");
  const [members, setMembers] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getAllUsersData = async () => {
      const res = await getAllUsers(email);
      if (res.status === 200) {
        setMembers(res.data);
      }
    };
    if (email) getAllUsersData();
  }, [email]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const options = ["Today", "This Week", "This Month"];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOpenModal = () => {
    openModal();
  };

  const handleAssignPeople = (email) => {
    setSelectedEmail(email);
  };

  const handleAssignPeopleSubmit = async () => {
    const data = {
      id: boardId,
      email: selectedEmail,
    };
    const res = await addMemberToBoard(data);
    if (res.status === 200) closeModal();
    else{
      console.log("object")
      setError(res.data.message);
      closeModal();
    }
  };

  return (
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
        <div className={`w3ModalContent w3Card4`}>
          <header className={`w3Container w3Teal`}>
            <h2>Add people to the board</h2>
          </header>
          {error && <span className="">{error}</span>}
          <div className={`w3Container`}>
            <input
              type="email"
              id="femail"
              name="femail"
              placeholder="Enter the email"
              value={selectedEmail}
              readOnly
            />
            <div className="assignDrpdown2">
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
                    <button onClick={() => handleAssignPeople(member.email)}>
                      Assign
                    </button>
                  </div>
                ))}

              {/* <AssignEmail />
                <AssignEmail /> */}
            </div>
            <div className={`formFooter`}>
              <button type="button" onClick={closeModal}>
                Cancel
              </button>
              <input
                type="submit"
                value="Submit"
                onClick={handleAssignPeopleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
