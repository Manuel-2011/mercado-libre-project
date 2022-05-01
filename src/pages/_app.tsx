import { useRouter } from "next/router";
import SearchBar from "../components/searchBar";
import styles from "./_app.styles.module.scss";
import "../common/styles/reset.styles.scss";

export default function MainLayout({ Component, pageProps }) {
  const router = useRouter();

  const goToProductsList = (query: string) => {
    router.push(`/items?q=${encodeURIComponent(query)}`);
  };

  return (
    <main className={styles.mainLayout}>
      <SearchBar
        placeholder="Nunca dejes de buscar"
        onClick={goToProductsList}
      />
      <Component {...pageProps} />
    </main>
  );
}
