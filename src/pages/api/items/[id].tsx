export interface Response {
  author: {
    name: string;
    lastname: string;
  };
  item: {
    id: string;
    title: string;
    price: { currency: string; amount: number; decimals: number };
    picture: string;
    condition: string;
    free_shipping: boolean;
    sold_quantity: Number;
    description: string;
    categories: string[];
  };
}

export interface Error {
  error: any;
}

export default async function handler(req, res): Promise<Response | Error> {
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

  let category;
  try {
    const rawResponse = await fetch(
      `https://api.mercadolibre.com/categories/${data.category_id}`
    );
    category = await rawResponse.json();
    category = category?.name;
  } catch (error) {
    category = null;
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
      categories: category ? [category] : [],
      picture: data.thumbnail,
      condition: data.condition,
      free_shipping: data.shipping.free_shipping,
      sold_quantity: data.sold_quantity,
      description,
    },
  };

  res.status(200).json(parsedData);
}
