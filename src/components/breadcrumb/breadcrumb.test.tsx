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
});
