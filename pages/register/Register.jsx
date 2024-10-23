import styles from "./Register.module.css";
import { useState } from "react";
import { register } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
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
    confirmPassword: {
      message: "Passwords do not match",
      isValid: formData.confirmPassword === formData.password,
      onError: () => {
        setError((error) => ({ ...error, confirmPassword: true }));
      },
    },
  };

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
    console.log(formData)
    const res = await register(formData);

    if (res.status === 201) {
      navigate("/login");
    } else {
      console.error("Something went wrong");
    }
  }

  return (
    <div className={styles.loginMain}>
      <div className={styles.loginLeftSide}>
        <div className={styles.leftContainer}>
          <img src="./images/login/login-art.png" alt="Login Art" />
          <h2>Welcome aboard my friend</h2>
          <p>Just a couple of clicks and we start</p>
        </div>
      </div>
      <div className={styles.loginRightSide}>
        <div className={styles.rightContainer}>
          <div className={styles.formMain}>
            <div className={`${styles.text}-center`}>
              <h3 className={styles.formHeading}>Register</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.userSec}>
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  className={styles.formField}
                  onChange={handleInputChange}
                />
                {error.name && (
                  <span className={styles.errorMsge}>
                    {errorMessages.name.message}
                  </span>
                )}
              </div>

              <div className={styles.emailSec}>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={styles.formField}
                  onChange={handleInputChange}
                />
                {error.email && (
                  <span className={styles.errorMsge}>
                    {errorMessages.email.message}
                  </span>
                )}
              </div>

              <div className={styles.passwordSec}>
                <div className={styles.passwordBlock}>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className={styles.formField}
                    onChange={handleInputChange}
                  />
                  <img
                    className={styles.eyeToggle}
                    src="./images/login/open-eye.png"
                    alt="Show/Hide password"
                  />
                </div>
                {error.password && (
                  <span className={styles.errorMsge}>
                    {errorMessages.password.message}
                  </span>
                )}
              </div>

              <div className={styles.passwordSec}>
                <div className={styles.passwordBlock}>
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className={styles.formField}
                    onChange={handleInputChange}
                  />
                  <img
                    className={styles.eyeToggle}
                    src="./images/login/open-eye.png"
                    alt="Show/Hide password"
                  />
                </div>
                {error.confirmPassword && (
                  <span className={styles.errorMsge}>
                    {errorMessages.confirmPassword.message}
                  </span>
                )}
              </div>

              <button type="submit" className={styles.mainBtn}>
                Register
              </button>
              <p>Have an account?</p>
              <button type="button" className={`${styles.mainBtn} second`}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
