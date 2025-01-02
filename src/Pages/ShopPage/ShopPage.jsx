import { useEffect, useState } from "react";
import styles from "./ShopPage.module.css";

function ShopPage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    let ignore = false;

    try {
      if (!ignore) {
        (async function () {
          const response = await fetch(
            "https://api.escuelajs.co/api/v1/products?offset=0&limit=15",
            {
              mode: "cors",
            }
          );
          const data = await response.json();
          console.log(data);
          setProducts(data);
        })();
      }
    } catch (e) {
      console.error(e.message);
    }

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <main className={styles.shop}>
      {products.length === 0 ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <div className={styles.products}>
          {products.map((product) => {
            return (
              <div className={styles.product} key={product.id}>
                <div className={styles.productImage}>
                  <img
                    className={styles.productImg}
                    src={product.images[0]}
                    alt="Product image"
                  />
                </div>
                <div className={styles.productTitle}>{product.title}</div>
                <div className={styles.productPrice}>{product.price}$</div>
                <button className={styles.addToCart}>Add To Cart</button>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default ShopPage;
