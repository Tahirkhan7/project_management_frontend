import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import styles from "./Analytics.module.css";

const Analytics = () => {
  return (
    <>
      <Breadcrumb pageName="Analytics" filter={false} addPeople={false} />

      {/* Calendar Section */}
      <div className={styles.customBox}>
        <div className={styles.analyticsBlock}>
          <div className={styles.analyticsTask}>
            <p className={styles.analyticsTaskText}>Backlog Tasks</p>
            <span className={styles.analyticsTaskCount}>16</span>
          </div>
          <div className={styles.analyticsTask}>
            <p className={styles.analyticsTaskText}>To-do Tasks</p>
            <span className={styles.analyticsTaskCount}>14</span>
          </div>
          <div className={styles.analyticsTask}>
            <p className={styles.analyticsTaskText}>In-Progress Tasks</p>
            <span className={styles.analyticsTaskCount}>03</span>
          </div>
          <div className={styles.analyticsTask}>
            <p className={styles.analyticsTaskText}>Completed Tasks</p>
            <span className={styles.analyticsTaskCount}>22</span>
          </div>
        </div>

        <div className={styles.analyticsBlock}>
          <div className={styles.analyticsTask}>
            <p className={styles.analyticsTaskText}>Low Priority</p>
            <span className={styles.analyticsTaskCount}>16</span>
          </div>
          <div className={styles.analyticsTask}>
            <p className={styles.analyticsTaskText}>Moderate Priority</p>
            <span className={styles.analyticsTaskCount}>14</span>
          </div>
          <div className={styles.analyticsTask}>
            <p className={styles.analyticsTaskText}>High Priority</p>
            <span className={styles.analyticsTaskCount}>03</span>
          </div>
          <div className={styles.analyticsTask}>
            <p className={styles.analyticsTaskText}>Due Date Tasks</p>
            <span className={styles.analyticsTaskCount}>22</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
