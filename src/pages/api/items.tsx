export interface Response {
  author: {
    name: string;
    lastname: string;
  };
  categories: string[];
  items: [
    {
      id: string;
      title: string;
      price: { currency: string; amount: number; decimals: number };
      picture: string;
      condition: string;
      free_shipping: boolean;
    }
  ];
  categories_filter: [{ id: string; name: string }];
}

export interface Error {
  error: any;
}

export default async function handler(req, res): Promise<Response | Error> {
  const search = req.query.q;
  const category = req.query.category;
  const queryParam = search ? `?q=${search}` : "";
  const filterParam = category ? `&category=${category}` : "";

  let data;
  try {
    const rawResponse = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search${queryParam}${filterParam}`
    );
    data = await rawResponse.json();
  } catch (error) {
    return res.status(200).json(error);
  }
  const availableCategories = data.available_filters.find(
    (filter) => filter.id === "category"
  )?.values;
  const availableCategoriesNames = availableCategories?.map(
    (category) => category.name
  );

  const resultsCategory = data.filters
    .find(({ id }) => id === "category")
    ?.values.map((category) => category.name);

  const parsedData: Response = {
    author: {
      name: "Manuel",
      lastname: "Mosquera",
    },
    categories: availableCategoriesNames || resultsCategory || [],
    items: data.results.map((item) => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: item.price,
        decimals: item.price % 1,
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
    })),
    categories_filter: availableCategories || [],
  };

  res.status(200).json(parsedData);
}
