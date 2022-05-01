import { fireEvent, render, screen } from "@testing-library/react";
import SearchBar from "./index";
import "@testing-library/jest-dom";

describe("SearchBar", () => {
  it("renders the company logo", () => {
    render(<SearchBar onClick={() => {}} />);

    const logo = screen.getByTestId("logo");

    expect(logo).toBeInTheDocument();
  });

  it("renders a form element", () => {
    render(<SearchBar onClick={() => {}} />);

    const form = screen.getByTestId("form");

    expect(form).toBeInTheDocument();
  });

  it("renders a search input element", () => {
    render(<SearchBar onClick={() => {}} />);

    const search = screen.getByTestId("search-input");

    expect(search).toBeInTheDocument();
  });

  it("sets the placeholder input with the placeholder prop", () => {
    render(<SearchBar onClick={() => {}} placeholder="buscar" />);

    const search = screen.getByTestId("search-input");

    expect(search).toHaveAttribute("placeholder", "buscar");
  });

  it("calls the onClick handler with the searched term when form is submitted", () => {
    const mockFunction = jest.fn();
    render(<SearchBar onClick={mockFunction} placeholder="buscar" />);

    const search = screen.getByTestId("search-input");
    fireEvent.change(search, { target: { value: "silla" } });
    expect(search).toHaveValue("silla");

    const form = screen.getByTestId("form");
    fireEvent.submit(form);

    expect(mockFunction).toHaveBeenCalledTimes(1);
    expect(mockFunction).toHaveBeenCalledWith("silla");
  });
});
