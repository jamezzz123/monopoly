// https://docs.cypress.io/api/introduction/api.html

describe("Go to games page", () => {
  it("Visits the app root url", () => {
    cy.visit("/Games");
    // cy.request("POST", "/test/seed/post", {
    //   title: "First Post",
    //   authorId: 1,
    //   body: "...",
    // });
  });
});
