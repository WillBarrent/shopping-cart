import { ShoppingBasket } from "lucide-react";
import PropTypes from "prop-types";
import styles from "./CartPage.module.css";
import Cart from "../../Components/Cart/Cart";

function CartPage({
  shoppingCart,
  removeFromCart,
  cartCountIncrement,
  cartCountDecrement,
}) {
  function totalPriceCount() {
    let totalPrice = 0;

    for (let i = 0; i < shoppingCart.length; i++) {
      totalPrice += shoppingCart[i].price * shoppingCart[i].count;
    }

    return totalPrice;
  }

  const totalPrice = totalPriceCount();

  return (
    <main className={styles.shoppingCart}>
      <div className={styles.cartInfo}>
        <ShoppingBasket size={48} />
        <h1 className={styles.cartTitle}>Shopping Cart</h1>
      </div>
      <div className={styles.carts}>
        {shoppingCart.map((cart) => {
          return (
            <Cart
              key={cart.id}
              id={cart.id}
              count={cart.count}
              imageUrl={cart.imageUrl}
              price={cart.price}
              title={cart.title}
              removeFromCart={removeFromCart}
              cartCountIncrement={cartCountIncrement}
              cartCountDecrement={cartCountDecrement}
            />
          );
        })}
      </div>
      <div className={styles.cartTotal}>
        <div className={styles.totalPrice}>Total: {totalPrice}$</div>
      </div>
    </main>
  );
}

CartPage.propTypes = {
  shoppingCart: PropTypes.array,
  removeFromCart: PropTypes.func,
  cartCountIncrement: PropTypes.func,
  cartCountDecrement: PropTypes.func,
};

export default CartPage;
