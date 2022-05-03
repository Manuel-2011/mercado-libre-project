// This file tests the main page of the app and the functionality of being able to search for products

describe("Searching for products", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001");
  });

  it("Shows an input", () => {
    cy.get("input").should("have.attr", "placeholder", "Nunca dejes de buscar");
  });

  const text = "play station";
  it("The input let you type text", () => {
    cy.get("input").type(text);
  });

  it("Search for a product", () => {
    cy.get("input").type(`${text}{enter}`);

    cy.url().should("include", `/items?search=${encodeURIComponent(text)}`);
  });
});
