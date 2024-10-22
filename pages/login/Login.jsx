import styles from "./login.module.css";

export default function Login() {
  return (
    <>
    <div className={styles.loginMain}>
            <div className={styles.loginLeftSide}>
                <div className={styles.leftContainer}>
                    <img src="./images/login/login-art.png" />
                    <h2>Welcome aboard my friend</h2>
                    <p>just a couple of clicks and we start</p>
                </div>
            </div>
            <div className={styles.loginRightSide}>
                <div className={styles.rightContainer}>
                {/* <!-- Sign In Form --> */}
                <div className={styles.formMain}>
                    <div className={`${styles.text}-center`}>
                    <h3 className={styles.formHeading}>
                        Login
                    </h3>
                    </div>
                    <form action="#">
                            <div className={styles.emailSec}>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className={styles.formField}
                                />
                                <span className={styles.errorMsge}>Your custom error messages</span>
                            </div>

                            <div className={styles.passwordSec}>
                                <div className={styles.passwordBlock}>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className={styles.formField}
                                    />
                                    <img className={styles.eyeToggle} src="./images/login/open-eye.png" />
                                </div>
                                <span className={styles.errorMsge}>Your custom error messages</span>
                            </div>
                            
                            <button className={styles.mainBtn}>Log in</button>
                            <p>Have no account yet?</p>
                            <button className={`${styles.mainBtn} second`}>Register</button>
                    </form>
                </div>

                </div>
            </div>
        </div>
    </>
  )
}
