import { FC } from "react";
import styles from "./breadcrumb.styles.module.scss";

interface Props {
  items: string[];
  handleClick?: (name: string) => void;
}

const Breadcrumb: FC<Props> = ({ items, handleClick }) => (
  <nav data-testid="breadcrumb">
    <ul className={styles.list}>
      {items.map((item, index) => {
        return (
          <div key={item}>
            <li
              {...(handleClick && items.length > 1
                ? { onClick: () => handleClick(item) }
                : { className: styles.noHoverEffect })}
            >
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
