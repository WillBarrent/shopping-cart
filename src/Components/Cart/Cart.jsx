import PropTypes from "prop-types";
import styles from "./Cart.module.css";

function Cart({
    imageUrl,
    title,
    count,
    price
}) {
  return (
    <div className={styles.cart}>
      <div className={styles.cartImage}>
        <img
          className={styles.cartImg}
          src={imageUrl}
          alt=""
        />
        <div className={styles.cartTitle}>{title}</div>
      </div>
      <div className={styles.cartCount}>
        <button className={styles.countDecrement}>-</button>
        <input className={styles.countNumber} type="text" disabled value={count} />
        <button className={styles.countIncrement}>+</button>
      </div>
      <div className={styles.cartCost}>{price * count}$</div>
    </div>
  );
}

Cart.propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
}