import { useEffect, useState } from "react";
import styles from "./ShopPage.module.css";
import Product from "../../Components/Product/Product";

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
              imageUrl: datum.images[0].slice(datum.images[0].indexOf("h")),
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
              <Product
                key={product.id}
                imageUrl={product.imageUrl}
                title={product.title}
                price={product.price}
                count={product.count}
                countIncrement={countIncrement}
                countDecrement={countDecrement}
                productData={product}
                productIndex={index}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}

export default ShopPage;
