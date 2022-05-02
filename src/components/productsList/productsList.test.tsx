import { fireEvent, render, screen } from "@testing-library/react";
import ProductsList from "./index";
import "@testing-library/jest-dom";
import { cloneDeep } from "lodash";
import { Response } from "../../pages/api/items";

const testData: Response = {
  author: { lastname: "Mosquera", name: "Manuel" },
  categories: [],
  items: [
    {
      condition: "new",
      free_shipping: true,
      id: "1",
      picture: "picture1",
      price: { amount: 12500.5, currency: "ARS", decimals: 0 },
      title: "product1",
    },
    {
      condition: "new",
      free_shipping: false,
      id: "2",
      picture: "picture2",
      price: { amount: 12500, currency: "ARS", decimals: 0 },
      title: "product2",
    },
    {
      condition: "new",
      free_shipping: true,
      id: "3",
      picture: "picture3",
      price: { amount: 12500, currency: "ARS", decimals: 0 },
      title: "product3",
    },
    {
      condition: "used",
      free_shipping: true,
      id: "4",
      picture: "picture4",
      price: { amount: 12500, currency: "ARS", decimals: 0 },
      title: "product4",
    },
    {
      condition: "new",
      free_shipping: true,
      id: "5",
      picture: "picture5",
      price: { amount: 12500, currency: "ARS", decimals: 0 },
      title: "product5",
    },
  ],
};

describe("ProductsList", () => {
  it("renders a maximum of 4 list elements", () => {
    render(<ProductsList data={testData} />);

    const items = screen.getAllByRole("listitem");

    expect(items.length).toBe(4);
  });
});

describe("List item in ProductsList", () => {
  it("renders an image", () => {
    render(<ProductsList data={testData} />);

    const img = screen.getByAltText("product1");

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "picture1");
  });

  it("renders the price", () => {
    render(<ProductsList data={testData} />);

    const price = screen.getByText("$ 12,500.5");

    expect(price).toBeInTheDocument();
  });

  it("renders the product name", () => {
    render(<ProductsList data={testData} />);

    const title = screen.getByText("product2");

    expect(title).toBeInTheDocument();
  });

  it("renders the product condition", () => {
    render(<ProductsList data={testData} />);

    const condition = screen.getByText("used");

    expect(condition).toBeInTheDocument();
  });

  it("renders free shipping if the product has free shipping", () => {
    const data = cloneDeep(testData);
    data.items = [data.items[0]];
    render(<ProductsList data={data} />);

    const item = screen.getByTestId("item-1");

    expect(item).toHaveTextContent("Envío gratis");
  });

  it("does not renders free shipping if the product does not have free shipping", () => {
    const data = cloneDeep(testData);
    data.items = [data.items[1]];
    render(<ProductsList data={data} />);

    const item = screen.getByTestId("item-2");

    expect(item).not.toHaveTextContent("Envío gratis");
  });
});
