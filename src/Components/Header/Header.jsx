import styles from "./Header.module.css";
import { Store, ShoppingCart, ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.navLogo}>
          <ShoppingBasket size={48} color="white" />
        </div>
        <ul className={styles.navigation}>
          <li className={styles.navigationItem}>
            <Link className={styles.navigationLink} to="/">
              Home
            </Link>
          </li>
          <li className={styles.navigationItem}>
            <Link className={styles.navigationLink} to="/shop">
              Shop
            </Link>
          </li>
        </ul>
        <div className={styles.shoppingCart}>
          <Link data-testid="cart" className={styles.navigationLink} to="/cart">
            <ShoppingCart size={48}/>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
