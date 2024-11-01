import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import styles from "./Login.module.css";
import { loginUser } from "../../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: false,
    password: false,
    loginError: false,
  });

  const errorMessages = {
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

    try {
      const res = await loginUser(formData);

      if (res.status === 200) {
        const data = {
          username: res.data.username,
          email: res.data.email,
          boardId: res.data.boardId,
          token: res.data.token,
        };
        login(data);
        
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError((prevError) => ({
          ...prevError,
          loginError: error.response.data.message,
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          loginError: "An unexpected error occurred!",
        }));
      }
    }
  }

  return (
    <>
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
                <h3 className={styles.formHeading}>Login</h3>
              </div>
              {error.loginError && (
                <span className={styles.errorMsge}>{error.loginError}</span>
              )}
              <form onSubmit={handleSubmit}>
                <div className={styles.emailSec}>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className={styles.formField}
                    value={formData.email}
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
                      value={formData.password}
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

                <button type="submit" className={styles.mainBtn}>
                  Log in
                </button>
                <p>Have no account yet?</p>
                <button type="button" className={`${styles.mainBtn} second`}>
                  <Link to="/register"> Register </Link>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
