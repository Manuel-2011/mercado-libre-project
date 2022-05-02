import { FC } from "react";
import styles from "./productsList.styles.module.scss";
import { Response } from "../../pages/api/items";
import { useRouter } from "next/router";

interface Props {
  data: Response;
}

const ProductsList: FC<Props> = ({ data }) => {
  const router = useRouter();

  const goToProductDetail = (productId) => {
    router.push(`/items/${productId}`);
  };

  return (
    <section>
      <ul className={styles.itemsList}>
        {data.items.slice(0, 4).map((item) => (
          <li
            key={`product-${item.id}`}
            className={styles.item}
            onClick={() => goToProductDetail(item.id)}
            data-testid={`item-${item.id}`}
          >
            <img
              src={item.picture}
              alt={item.title}
              className={styles.itemImg}
            />
            <div className={styles.itemInfo}>
              <span>
                <span className={styles.itemPrice} aria-label="price">
                  $ {item.price.amount.toLocaleString("en-US")}
                </span>{" "}
                {item.free_shipping && (
                  <span className={styles.freeShipping}>Envío gratis</span>
                )}
              </span>
              <h3 className={styles.itemTitle}>{item.title}</h3>
            </div>
            <span className={styles.itemCondition}>{item.condition}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductsList;
