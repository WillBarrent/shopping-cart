import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

function HomePage() {
    return <main className={styles.home}>
        <div className={styles.homeBackground}></div>
        <div className={styles.homeInfo}>
            <h1 className={styles.homeTitle}>Shopping Cart</h1>
            <Link to="/shop" className={styles.link}>Shop Now</Link>
        </div>
    </main>;
}

export default HomePage;

