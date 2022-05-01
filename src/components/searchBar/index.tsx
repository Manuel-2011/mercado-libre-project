import { useState, FC, SyntheticEvent } from "react";
import Image from "next/image";
import SearchIcon from "../../common/icons/search";

import styles from "./searchBar.styles.module.scss";

interface Props {
  placeholder?: string;
  onClick(val: string): void;
}

const SearchBar: FC<Props> = ({ placeholder, onClick }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    onClick(search);
  };

  return (
    <div className={styles.container}>
      <Image
        src="/images/mercado-libre-logo.png"
        alt="Mercado libre logo"
        width="90"
        height="90"
      />
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          className={styles.searchInput}
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className={styles.searchSubmit} type="submit">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
};

SearchBar.defaultProps = {
  placeholder: "Busca...",
};

export default SearchBar;
