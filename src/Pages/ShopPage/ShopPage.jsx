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

          let data = await response.json();
          data = data.map((datum) => {
            return {
              id: datum.id,
              image: datum.images[0].slice(datum.images[0].indexOf("h")),
              title: datum.title,
              price: datum.price,
              count: 1,
            };
          });

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

  function countIncrement(product, index) {
    const updatedProduct = product;
    updatedProduct.count += 1;
    const updatedProductsList = products.map((product) => product);
    updatedProductsList[index] = updatedProduct;
    setProducts(updatedProductsList);
  }

  function countDecrement(product, index) {
    const updatedProduct = product;
    if (updatedProduct.count > 1) {
      updatedProduct.count -= 1;
    }
    const updatedProductsList = products.map((product) => product);
    updatedProductsList[index] = updatedProduct;
    setProducts(updatedProductsList);
  }

  return (
    <main className={styles.shop}>
      {products.length === 0 ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <div className={styles.products}>
          {products.map((product, index) => {
            return (
              <div className={styles.product} key={product.id}>
                <div className={styles.productImage}>
                  <img
                    className={styles.productImg}
                    src={product.image}
                    alt="Product image"
                  />
                </div>
                <div className={styles.productTitle}>{product.title}</div>
                <div className={styles.productPrice}>{product.price}$</div>
                <div className={styles.addToCart}>
                  <div className={styles.productCount}>
                    <button
                      onClick={() => countDecrement(product, index)}
                      className={styles.countDecrement}
                    >
                      -
                    </button>
                    <input
                      className={styles.countNumber}
                      type="text"
                      disabled
                      value={product.count}
                    />
                    <button
                      onClick={() => countIncrement(product, index)}
                      className={styles.countIncrement}
                    >
                      +
                    </button>
                  </div>
                  <button className={styles.addToCartBtn}>Add To Cart</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default ShopPage;
