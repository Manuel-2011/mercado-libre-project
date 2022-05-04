// This file tests that after a search the items are properly rendered

describe("Listing the items", () => {
  let pageProps;
  beforeEach(() => {
    cy.visit("http://localhost:3001/items?search=silla");
    cy.window().then((win) => {
      pageProps = win.__NEXT_DATA__.props.pageProps;
    });
  });

  it("Shows the bradcrumb with the search category", () => {
    cy.get("nav li").should("have.length", pageProps.data.categories.length);

    for (const category of pageProps.data.categories) {
      cy.get("nav li").contains(category);
    }
  });

  it("Shows the first 4 items", () => {
    const maxLength =
      pageProps.data.items.length > 4 ? 4 : pageProps.data.items.length;

    cy.get("section ul li").should("have.length", maxLength);
  });

  it("Shows all the product relevant info", () => {
    const firstItem = pageProps.data.items[0];

    cy.get(`[data-testid="item-${firstItem.id}"]`)
      .find("h3")
      .should("have.text", firstItem.title);
    cy.get(`[data-testid="item-${firstItem.id}"]`).contains(
      firstItem.condition
    );
    cy.get(`[data-testid="item-${firstItem.id}"]`).contains(
      firstItem.price.amount.toLocaleString("en-US")
    );
    cy.get(`[data-testid="item-${firstItem.id}"]`)
      .find("img")
      .should("have.attr", "src", firstItem.picture);

    if (firstItem.free_shipping) {
      cy.get(`[data-testid="item-${firstItem.id}"]`).contains("Envío gratis");
    } else {
      cy.get(`[data-testid="item-${firstItem.id}"]`)
        .contains("Envío gratis")
        .should("not.exist");
    }
  });

  it("Redirects to the product detail page", () => {
    const firstItem = pageProps.data.items[0];

    cy.get(`[data-testid="item-${firstItem.id}"]`).click();

    cy.url().should("include", `/items/${firstItem.id}`);
  });
});
