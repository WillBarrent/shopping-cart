import { ShoppingBasket } from "lucide-react";
import PropTypes from "prop-types";
import styles from "./CartPage.module.css";

function CartPage({
  shoppingCart
}) {
  console.log(shoppingCart);
  return (
    <main className={styles.shoppingCart}>
      <div className={styles.cartInfo}>
        <ShoppingBasket size={48} />
        <h1 className={styles.cartTitle}>Shopping Cart</h1>
      </div>
      <div className={styles.carts}>
        
        
      </div>
    </main>
  );
}

CartPage.propTypes = {
  shoppingCart: PropTypes.array,
}

export default CartPage;
