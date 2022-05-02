import { FC } from "react";
import { Response, Error } from "./api/items";
import Breadcrumb from "../components/breadcrumb";
import ProductsList from "../components/productsList";

interface Props {
  data: Response | Error;
}

const Items: FC<Props> = ({ data }) => {
  if ("error" in data) {
    return <h1>There was an error</h1>;
  }

  return (
    <>
      <Breadcrumb items={data.categories} />
      <ProductsList data={data} />
    </>
  );
};

export default Items;

export async function getServerSideProps({ query }) {
  const { q } = query;
  const res = await fetch(`http://localhost:3001/api/items?q=${q}`);
  const data: Promise<Response | Error> = await res.json();

  return {
    props: {
      data,
    },
  };
}
