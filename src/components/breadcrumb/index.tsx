import { FC } from "react";
import styles from "./breadcrumb.styles.module.scss";

interface Props {
  items: string[];
}

const Breadcrumb: FC<Props> = ({ items }) => (
  <nav data-testid="breadcrumb">
    <ul className={styles.list}>
      {items.map((item, index) => {
        return (
          <div key={item}>
            <li>
              <span>{item}</span>
            </li>
            {index < items.length - 1 && <span>&gt;</span>}
          </div>
        );
      })}
    </ul>
  </nav>
);

export default Breadcrumb;
