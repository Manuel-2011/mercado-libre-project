import { FC } from "react";
import styles from "./breadcrumb.styles.module.scss";

interface Props {
  items: string[];
}

const Breadcrumb: FC<Props> = ({ items }) => {
  return (
    <nav data-testid="breadcrumb">
      <ul className={styles.list}>
        {items.slice(0, 4).map((item, index) => {
          return (
            <li key={item}>
              <span>{item}</span>
              <span>{index < 3 && "|"}</span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
