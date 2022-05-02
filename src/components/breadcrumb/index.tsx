import { FC } from "react";
import styles from "./breadcrumb.styles.module.scss";

interface Props {
  items: string[];
}

const Breadcrumb: FC<Props> = ({ items }) => {
  const itemsToRender = items.slice(0, 4);

  return (
    <nav data-testid="breadcrumb">
      <ul className={styles.list}>
        {itemsToRender.map((item, index) => {
          return (
            <li key={item}>
              <span>{item}</span>
              {index < itemsToRender.length - 1 && <span>|</span>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
