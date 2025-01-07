import { useEffect, useState } from "react";
import styles from "./ShopPage.module.css";
import PropTypes from "prop-types";
import Product from "../../Components/Product/Product";
import { StoreIcon } from "lucide-react";

export async function getProductsData() {
  const response = await fetch(
    "https://fakestoreapi.com/products",
    {
      mode: "cors",
    }
  );

  let data = await response.json();

  data = data.map((product) => {
    return {
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
      count: 1,
    };
  });

  return data;
}

function ShopPage({
  shoppingCart,
  addToCart
}) {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    let ignore = false;

    try {
      if (!ignore) {
        (async function () {
          const data = await getProductsData();

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
      <div className={styles.shopInfo}>
        <StoreIcon size={48} />
        <h1 className={styles.shopTitle}>Product Page</h1>
      </div>
      {products.length === 0 ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <div className={styles.products}>
          {products.map((product, index) => {
            return (
              <Product
                key={product.id}
                imageUrl={product.image}
                title={product.title}
                price={product.price}
                count={product.count}
                countIncrement={countIncrement}
                countDecrement={countDecrement}
                productData={product}
                productIndex={index}
                addToCart={addToCart}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}

ShopPage.propTypes = {
  shoppingCart: PropTypes.array,
  addToCart: PropTypes.func,
}

export default ShopPage;
