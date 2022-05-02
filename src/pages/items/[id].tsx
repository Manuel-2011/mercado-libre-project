import { FC } from "react";
import styles from "../index.styles.module.scss";
import { Response, Error } from "../api/items/[id]";
import ProductDetail from "../../components/productDetail";

interface Props {
  data: Response | Error;
}

const ProductDetailPage: FC<Props> = ({ data }) => {
  if ("error" in data) {
    return <h1>There was an error</h1>;
  }

  return <ProductDetail item={data.item} />;
};

export default ProductDetailPage;

export async function getServerSideProps({ params }) {
  const { id } = params;
  const res = await fetch(`http://localhost:3001/api/items/${id}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
