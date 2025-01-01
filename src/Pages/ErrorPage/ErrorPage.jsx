import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

function ErrorPage() {
  return (
    <div className={styles.error}>
      <div className={styles.errorTitle}>Sorry, but something went wrong.</div>
      <div className={styles.errorSubtitle}>Maybe this page doesn't exist.</div>
      <Link className={styles.errorLink} to="">
        Go Back To Home Page
      </Link>
    </div>
  );
}

export default ErrorPage;
