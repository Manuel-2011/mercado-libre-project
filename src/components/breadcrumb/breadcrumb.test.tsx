import { fireEvent, render, screen } from "@testing-library/react";
import Breadcrumb from "./index";
import "@testing-library/jest-dom";

describe("SearchBar", () => {
  it("renders a nav element", () => {
    render(
      <Breadcrumb
        items={[
          "Muebles y accesorios",
          "Accesorios",
          "Hogar",
          "Oficina",
          "Carpintería",
        ]}
      />
    );

    const nav = screen.getByRole("navigation");

    expect(nav).toBeInTheDocument();
  });

  it("renders all the items passed to it", () => {
    render(
      <Breadcrumb
        items={[
          "Muebles y accesorios",
          "Accesorios",
          "Hogar",
          "Oficina",
          "Carpintería",
        ]}
      />
    );

    const items = screen.getAllByRole("listitem");

    expect(items.length).toBe(5);
  });

  it("calls the handleClick function passed to it when a li element is clicked", () => {
    const handleClick = jest.fn();
    render(
      <Breadcrumb
        items={[
          "Muebles y accesorios",
          "Accesorios",
          "Hogar",
          "Oficina",
          "Carpintería",
        ]}
        handleClick={handleClick}
      />
    );

    const items = screen.getAllByRole("listitem");

    fireEvent.click(items[0]);
    expect(handleClick).toBeCalledTimes(1);
    expect(handleClick).toBeCalledWith("Muebles y accesorios");
  });
});
