import PropTypes from "prop-types";
import styles from "./Cart.module.css";
import { CircleX } from "lucide-react";

function Cart({
  id,
  imageUrl,
  title,
  count,
  price,
  removeFromCart,
  cartCountIncrement,
  cartCountDecrement,
}) {
  return (
    <div className={styles.cart}>
      <div className={styles.cartImage}>
        <img className={styles.cartImg} src={imageUrl} alt="" />
        <div className={styles.cartTitle}>{title}</div>
      </div>
      <div className={styles.cartCount}>
        <button
          onClick={() => cartCountDecrement(id)}
          className={styles.countDecrement}
        >
          -
        </button>
        <input
          className={styles.countNumber}
          type="text"
          disabled
          value={count}
        />
        <button
          onClick={() => cartCountIncrement(id)}
          className={styles.countIncrement}
        >
          +
        </button>
      </div>
      <div className={styles.cartCost}>{price * count}$</div>
      <div className={styles.cartRemove} onClick={() => removeFromCart(id)}>
        <CircleX className={styles.removeBtn} size={30} color="red" />
      </div>
    </div>
  );
}

Cart.propTypes = {
  id: PropTypes.number,
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.number,
  price: PropTypes.number,
  removeFromCart: PropTypes.func,
  cartCountIncrement: PropTypes.func,
  cartCountDecrement: PropTypes.func,
};

export default Cart;
