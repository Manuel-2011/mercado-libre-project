import { FC } from "react";
import { Response, Error } from "../api/items/[id]";
import ProductDetail from "../../components/productDetail";
import Breadcrumb from "../../components/breadcrumb";
import { server } from "../../../config";
import Head from "next/head";

interface Props {
  data: Response | Error;
}

const ProductDetailPage: FC<Props> = ({ data }) => {
  if ("error" in data) {
    return <h1>There was an error</h1>;
  }

  const addProductJsonLd = (item) => {
    return {
      __html: `{
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "${item.title}",
      "image": [
        "${item.picture}",
       ],
      "description": "${item.description}",
      "sku": "${item.id}",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "${item.price.currency}",
        "price": "${item.price.amount}",
        "itemCondition": "${item.condition}"
      }
    }
  `,
    };
  };

  return (
    <>
      {data?.item?.title && (
        <Head>
          <title>{data.item.title} | Mercado Libre</title>
          <meta name="description" content={data.item.description} />
          <meta property="og:title" content={data.item.title} />
          <meta property="og:description" content={data.item.description} />
          <meta property="og:image" content={data.item.picture} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={addProductJsonLd(data.item)}
            key="product-jsonld"
          />
        </Head>
      )}
      <Breadcrumb items={data.item.categories} />
      <ProductDetail item={data.item} />
    </>
  );
};

export default ProductDetailPage;

export async function getServerSideProps({ params }) {
  const { id } = params;
  const res = await fetch(`${server}/api/items/${id}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
