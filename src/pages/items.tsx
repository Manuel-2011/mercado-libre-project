import { FC, useCallback } from "react";
import { Response, Error } from "./api/items";
import Breadcrumb from "../components/breadcrumb";
import ProductsList from "../components/productsList";
import { server } from "../../config";
import { useRouter } from "next/router";
import Head from "next/head";

interface Props {
  data: Response | Error;
  search: string;
}

const Items: FC<Props> = ({ data, search }) => {
  const router = useRouter();

  if ("error" in data) {
    return <h1>There was an error</h1>;
  }

  const handleClick = useCallback(
    (categoryName) => {
      const selectedCategory = data.categories_filter.find(
        (category) => category.name === categoryName
      );
      if (selectedCategory) {
        router.push(`/items?search=${search}&category=${selectedCategory.id}`);
      }
    },
    [data, router]
  );

  return (
    <>
      {search && (
        <Head>
          <title>{search} | Mercado Libre</title>
          <meta
            name="description"
            content={`Listado de productos para la busqueda: ${search}.`}
          />
        </Head>
      )}
      <Breadcrumb items={data.categories} handleClick={handleClick} />
      <ProductsList data={data} />
    </>
  );
};

export default Items;

export async function getServerSideProps({ query }) {
  const { search, category } = query;
  const categoryFilter = category ? `&category=${category}` : "";
  const res = await fetch(`${server}/api/items?q=${search}${categoryFilter}`);
  const data: Promise<Response | Error> = await res.json();

  return {
    props: {
      data,
      search,
    },
  };
}
