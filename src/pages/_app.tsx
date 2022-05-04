import { useRouter } from "next/router";
import SearchBar from "../components/searchBar";
import styles from "./_app.styles.module.scss";
import "../common/styles/reset.styles.scss";
import Head from "next/head";

export default function MainLayout({ Component, pageProps }) {
  const router = useRouter();

  const goToProductsList = (query: string) => {
    router.push(`/items?search=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <Head>
        <title>Mercado Libre</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="robots" content="index,follow" />
      </Head>
      <div className={styles.mainLayout}>
        <SearchBar
          placeholder="Nunca dejes de buscar"
          onClick={goToProductsList}
        />
        <Component {...pageProps} />
      </div>
    </>
  );
}
