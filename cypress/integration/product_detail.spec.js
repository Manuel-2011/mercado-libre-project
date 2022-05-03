// This file tests the product detail page

describe("Product detail", () => {
  let item;
  beforeEach(() => {
    cy.request("GET", "http://localhost:3001/api/items?q=silla").then(
      (response) => {
        const itemId = response.body.items[0].id;
        cy.visit(`http://localhost:3001/items/${itemId}`);
        cy.window().then((win) => {
          item = win.__NEXT_DATA__.props.pageProps.data.item;
        });
      }
    );
  });

  it("Shows the bradcrumb with the product category", () => {
    cy.get("nav li").should("have.length", item.categories.length);

    for (const category of item.categories) {
      cy.get("nav li").contains(category);
    }
  });

  it("Shows all the product relevant info", () => {
    cy.get("[data-testid='product-detail']")
      .find("img")
      .should("have.attr", "src", item.picture);

    cy.get("[data-testid='product-detail']").contains(item.condition);

    cy.get("[data-testid='product-detail']").contains(item.sold_quantity);

    cy.get("[data-testid='product-detail']").contains(
      item.price.amount.toLocaleString("en-US")
    );

    if (item.free_shipping) {
      cy.contains("Envío gratis");
    } else {
      cy.get("[data-testid='product-detail']")
        .contains("Envío gratis")
        .should("not.exist");
    }

    if (item.description) {
      cy.get("[data-testid='product-description']").should(
        "have.text",
        item.description
      );
    }
  });

  it("Shows a button to buy the product", () => {
    cy.contains("Comprar").should("exist");
  });
});
