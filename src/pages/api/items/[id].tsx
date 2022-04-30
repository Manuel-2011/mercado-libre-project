interface Response {
  author: {
    name: String;
    lastname: String;
  };
  item: {
    id: String;
    title: String;
    price: { currency: String; amount: Number; decimals: Number };
    picture: String;
    condition: String;
    free_shipping: Boolean;
    sold_quantity: Number;
    description: String;
  };
}

export default async function handler(req, res) {
  const { id } = req.query;

  let data;
  try {
    const rawResponse = await fetch(`https://api.mercadolibre.com/items/${id}`);
    data = await rawResponse.json();
  } catch (error) {
    return res.status(200).json(error);
  }

  let description;
  try {
    const rawResponse = await fetch(
      `https://api.mercadolibre.com/items/${id}/description`
    );
    description = await rawResponse.json();
    description = description.plain_text;
  } catch (error) {
    description = "";
  }

  const parsedData: Response = {
    author: {
      name: "Manuel",
      lastname: "Mosquera",
    },
    item: {
      id: data.id,
      title: data.title,
      price: {
        currency: data.currency_id,
        amount: data.price,
        decimals: data.price % 1,
      },
      picture: data.thumbnail,
      condition: data.condition,
      free_shipping: data.shipping.free_shipping,
      sold_quantity: data.sold_quantity,
      description,
    },
  };

  res.status(200).json(parsedData);
}
