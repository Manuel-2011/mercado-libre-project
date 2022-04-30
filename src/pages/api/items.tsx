interface Response {
  author: {
    name: String;
    lastname: String;
  };
  categories: String[];
  items: [
    {
      id: String;
      title: String;
      price: { currency: String; amount: Number; decimals: Number };
      picture: String;
      condition: String;
      free_shipping: Boolean;
    }
  ];
}

export default async function handler(req, res) {
  const search = req.query.q;
  const queryParam = search ? `?q=${search}` : "";

  let data;
  try {
    const rawResponse = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search${queryParam}`
    );
    data = await rawResponse.json();
  } catch (error) {
    return res.status(200).json(error);
  }

  const categories = data.available_filters.find(
    ({ id }) => id === "category"
  ).values;

  const categoriesSortedByResults = categories.sort((a, b) => {
    if (a.results > b.results) {
      return -1;
    }
    if (a.results < b.results) {
      return 1;
    }
    return 0;
  });

  const parsedData: Response = {
    author: {
      name: "Manuel",
      lastname: "Mosquera",
    },
    categories: categoriesSortedByResults,
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
  };

  res.status(200).json(parsedData);
}
