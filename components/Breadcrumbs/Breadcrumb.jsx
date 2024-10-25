import { useState } from 'react';
import styles from "./Breadcrumbs.module.css";

// eslint-disable-next-line react/prop-types
const Breadcrumb = ({ pageName, filter, addPeople }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('This Week');

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const options = ['Today', 'This Week', 'This Month'];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.headerSection}>
      <div className={styles.headerSectionBlock}>
        <h2 className={styles.pageTitle}>{pageName}</h2>
        {addPeople && (
          <button onClick={openModal}>
            <img src="./images/main/people.png" alt="Add People" /> Add People
          </button>
        )}
      </div>

      {filter && (
        <div className={styles.dropdown}>
          <button className={styles.dropbtn} onClick={toggleDropdown}>
            {selectedOption}
            <img src="./images/main/dropdown.png" alt="Dropdown icon" className={styles.dropdownIcon} />
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

      {/* <div id="id01" className={`w3Modal ${isModalOpen ? 'show' : ''}`}>
        <div className={`${styles.w3ModalContent} w3Card4`}>
          <header className={`${styles.w3Container} w3Teal`}>
            <h2>Add people to the board</h2>
          </header>
          <div className={styles.w3Container}>
            <form>
              <input
                type="email"
                id="femail"
                name="femail"
                placeholder="Enter the email"
              />
              <div className={`${styles.form} footer`}>
                <button type="button" onClick={closeModal}>Cancel</button>
                <input type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Breadcrumb;
