import { useContext, useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import openEye from "../../public/images/login/open-eye.png";
import { myDetails, updateUser } from "../../services/auth";
import styles from "./Settings.module.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Settings = () => {
  const navigate = useNavigate();
  const { email } = useContext(AppContext);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    newPassword: "",
  });
  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
    newPassword: false,
    registerError: false,
  });

  const errorMessages = {
    name: {
      message: "Name is required",
      isValid: formData.name.length > 0,
      onError: () => {
        setError((error) => ({ ...error, name: true }));
      },
    },
    email: {
      message: "Email is required",
      isValid: formData.email.length > 0,
      onError: () => {
        setError((error) => ({ ...error, email: true }));
      },
    },
    password: {
      message: "Password is required",
      isValid: formData.password.length > 0,
      onError: () => {
        setError((error) => ({ ...error, password: true }));
      },
    },
    newPassword: {
      message: "Passwords do not match",
      isValid: formData.newPassword === formData.password,
      onError: () => {
        setError((error) => ({ ...error, newPassword: true }));
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await myDetails(email);
        setFormData({
          id: result.data._id,
          name: result.data.name,
          email: result.data.email,
          password: "",
          newPassword: "",
        });
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchData();
  }, [email]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: false }));
  };

  const validateForm = () => {
    let valid = true;
    Object.keys(errorMessages).forEach((field) => {
      if (!errorMessages[field].isValid) {
        errorMessages[field].onError();
        valid = false;
      }
    });
    return valid;
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await updateUser(formData);

      if (res.status == 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError((prevError) => ({
          ...prevError,
          registerError: error.response.data.message,
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          registerError: "An unexpected error occurred!",
        }));
      }
    }
  }

  return (
    <>
      <Breadcrumb pageName="Settings" filter={false} addPeople={false} />

      <div className={styles.customBox}>
        <div className={`${styles.settingFormSec} ${styles.formMain}`}>
          <form onSubmit={handleSubmit}>
            <div className={styles.userSec}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className={styles.formField}
                value={formData.name}
                onChange={handleInputChange}
              />
              <span className={styles.errorMsge}>
                {error.name && errorMessages.name.message}
              </span>
            </div>

            <div className={styles.emailSec}>
              <input
                type="email"
                name="email"
                placeholder="Update Email"
                className={styles.formField}
                value={formData.email}
                onChange={handleInputChange}
              />
              <span className={styles.errorMsge}>
                {error.email && errorMessages.email.message}
              </span>
            </div>

            <div className={styles.passwordSec}>
              <div className={styles.passwordBlock}>
                <input
                  type="password"
                  name="password"
                  placeholder="Old Password"
                  className={styles.formField}
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <img className={styles.eyeToggle} src={openEye} alt="Toggle Visibility" />
              </div>
              <span className={styles.errorMsge}>
                {error.password && errorMessages.password.message}
              </span>
            </div>

            <div className={styles.passwordSec}>
              <div className={styles.passwordBlock}>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Password"
                  className={styles.formField}
                  value={formData.newPassword}
                  onChange={handleInputChange}
                />
                <img className={styles.eyeToggle} src={openEye} alt="Toggle Visibility" />
              </div>
              <span className={styles.errorMsge}>
                {error.newPassword && errorMessages.newPassword.message}
              </span>
            </div>
            <button type="submit" className={styles.mainBtn}>Update</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Settings;
