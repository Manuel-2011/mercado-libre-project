import { FC } from "react";
import styles from "./productsList.styles.module.scss";
import { Response } from "../../pages/api/items";
import Link from "next/link";

interface Props {
  data: Response;
}

const ProductsList: FC<Props> = ({ data }) => (
  <section>
    <ul className={styles.itemsList}>
      {data.items.slice(0, 4).map((item) => (
        <Link href={`/items/${item.id}`} key={`product-${item.id}`}>
          <a data-testid={`item-${item.id}`}>
            <li className={styles.item}>
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
          </a>
        </Link>
      ))}
    </ul>
  </section>
);

export default ProductsList;
