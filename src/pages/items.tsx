import { FC } from "react";
import styles from "./index.styles.module.scss";

const App: FC = ({ data }) => {
  if (data.error) {
    return <h1>There was an error</h1>;
  }

  return <h1 className={styles.title}>Resultados</h1>;
};

export default App;

export async function getServerSideProps({ query }) {
  const { q } = query;
  const res = await fetch(`http://localhost:3001/api/items?q=${q}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}