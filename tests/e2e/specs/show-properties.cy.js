// https://docs.cypress.io/api/introduction/api.html

describe("Test show property feature", () => {
  //   it("Visits the app root url", () => {
  //     cy.visit("/Games");
  //   });

  it("Check if property shows", () => {
    cy.visit("/Games");
    cy.wait(7000);
    cy.get('[data-test="board-item"]').should("have.length", 40);
    cy.get('[data-test="board-item"]').then(($li) => {
      const items = $li.toArray();
      items[10].click();
    });
    cy.get('[data-test="property-modal"]').and("be.visible");
  });

  it("Check if property ok button is not visible", () => {
    cy.visit("/Games");
    cy.wait(7000);
    cy.get('[data-test="board-item"]').should("have.length", 40);
    cy.get('[data-test="board-item"]').then(($li) => {
      const items = $li.toArray();
      items[10].click();
    });
    cy.get('[data-test="ok-modal-button"]').and("be.not.visible");
  });
});
