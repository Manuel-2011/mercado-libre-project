import { fireEvent, render, screen } from "@testing-library/react";
import { cloneDeep } from "lodash";
import ProductDetail from "./index";
import "@testing-library/jest-dom";
import { Response } from "../../pages/api/items/[id]";

const testData: Response["item"] = {
  condition: "nuevo",
  free_shipping: true,
  id: "1",
  picture: "picture1.jpg",
  price: { amount: 12500.99, currency: "ARS", decimals: 0.989999 },
  title: "product1",
  sold_quantity: 234,
  description: "This is product 1.",
  categories: [],
};

describe("ProductDetail", () => {
  it("renders an image", () => {
    render(<ProductDetail item={testData} />);

    const img = screen.getByAltText("product1");

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "picture1.jpg");
  });

  it("renders the condition", () => {
    render(<ProductDetail item={testData} />);

    const soldQuantity = screen.getByText("234 vendidos");

    expect(soldQuantity).toBeInTheDocument();
  });

  it("renders the product sold quantity", () => {
    render(<ProductDetail item={testData} />);

    const condition = screen.getByLabelText("condition");

    expect(condition).toHaveTextContent(/nuevo/i);
  });

  it("renders the price", () => {
    render(<ProductDetail item={testData} />);

    const price = screen.getByLabelText("product price");

    expect(price).toHaveTextContent(/\$[\s]*12,500[\s]*99/);
  });

  it("renders the product name", () => {
    render(<ProductDetail item={testData} />);

    const name = screen.getByText("product1");

    expect(name).toBeInTheDocument();
  });

  it("renders free shipping if the product has free shipping", () => {
    render(<ProductDetail item={testData} />);

    const item = screen.getByTestId("product-detail");

    expect(item).toHaveTextContent("Envío gratis");
  });

  it("does not renders free shipping if the product does not have free shipping", () => {
    const data = cloneDeep(testData);
    data.free_shipping = false;
    render(<ProductDetail item={data} />);

    const item = screen.getByTestId("product-detail");

    expect(item).not.toHaveTextContent("Envío gratis");
  });

  it("calls the function passed to handleClick when 'Comprar' is pressed", () => {
    const handleClick = jest.fn();
    render(<ProductDetail item={testData} handleClick={handleClick} />);

    const button = screen.getByText(/comprar/i);
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders the product description", () => {
    render(<ProductDetail item={testData} />);

    const description = screen.getByText(/This is product 1./i);

    expect(description).toBeInTheDocument();
  });
});
