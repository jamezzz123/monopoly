// https://docs.cypress.io/api/introduction/api.html

describe("Go to games page", () => {
  it("Visits the app root url", () => {
    cy.visit("/Games");
  });
  it("Check if decision modal opens when you land on a property", () => {
    cy.visit("/Games");
    cy.wait(7000);
    cy.get('[data-test="ok-modal-button"]').and("be.visible");
  });

  it("Check if after clicking  modal closes", () => {
    cy.get('[data-test="ok-modal-button"]').then(($btn) => {
      $btn.click();
    });

    cy.get('[data-test="ok-modal-button"]').and("be.not.visible");
  });
});
