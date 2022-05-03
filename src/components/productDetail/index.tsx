import { FC } from "react";
import { Response } from "../../pages/api/items/[id]";
import styles from "./productDetail.styles.module.scss";

interface Props {
  item: Response["item"];
  handleClick?(): void;
}

const ProductDetail: FC<Props> = ({ item, handleClick }) => {
  return (
    <div>
      <section data-testid="product-detail" className={styles.section}>
        <img src={item.picture} alt={item.title} className={styles.image} />
        <div aria-label="main product info" className={styles.productInfo}>
          <span className={styles.condition} aria-label="condition">
            {item.condition} |{" "}
          </span>
          <span className={styles.soldQty} aria-label="sold quantity">
            {`${item.sold_quantity} vendido${
              item.sold_quantity > 1 ? "s" : ""
            }`}
          </span>
          <h2 aria-label="product name" className={styles.title}>
            {item.title}
          </h2>
          <span aria-label="product price" className={styles.price}>
            $ {Math.floor(item.price.amount).toLocaleString("en-US")}{" "}
            <span>{item.price.decimals.toFixed(2).replace("0.", "")}</span>
          </span>
          {item.free_shipping && (
            <span className={styles.freeShipping}>Envío gratis</span>
          )}
          <button onClick={handleClick} className={styles.btn}>
            Comprar
          </button>
        </div>
        {item.description && (
          <div className={styles.description}>
            <h4>Descripción del producto</h4>
            <p>{item.description}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductDetail;
