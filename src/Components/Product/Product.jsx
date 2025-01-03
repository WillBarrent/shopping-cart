import PropTypes from "prop-types";
import styles from "./Product.module.css";

function Product({
  imageUrl,
  title,
  price,
  count,
  countIncrement,
  countDecrement,
  productData,
  productIndex
}) {
  return (
    <div className={styles.product}>
      <div className={styles.productImage}>
        <img className={styles.productImg} src={imageUrl} alt="Product image" />
      </div>
      <div className={styles.productTitle}>{title}</div>
      <div className={styles.productPrice}>{price}$</div>
      <div className={styles.addToCart}>
        <div className={styles.productCount}>
          <button
            onClick={() => countDecrement(productData, productIndex)}
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
            onClick={() => countIncrement(productData, productIndex)}
            className={styles.countIncrement}
          >
            +
          </button>
        </div>
        <button className={styles.addToCartBtn}>Add To Cart</button>
      </div>
    </div>
  );
}

Product.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  count: PropTypes.number,
  countIncrement: PropTypes.func,
  countDecrement: PropTypes.func,
  productData: PropTypes.object,
  productIndex: PropTypes.number,
};

export default Product;
