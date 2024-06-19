describe("Issue - time tracking functionality - adding, editing and deleting", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board/");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  it("Time estimation functionality", () => {
    // ADD ESTIMATION
    cy.get(issueTimeTracking.issueDetails).within(() => {
      cy.get(issueTimeTracking.numberField).click().clear();
      issueTimeTracking.openTimeTracking();
    });
    cy.get(issueTimeTracking.modalTracking).within(() => {
      // Clear existing time estimates and assert initial state
      cy.get(issueTimeTracking.placeHolderNumber).first().clear();
      cy.contains("No time logged");
    });
    issueTimeTracking.clickDoneInModalTracking();
    cy.get(issueTimeTracking.issueDetails).within(() => {
      cy.contains("No time logged");
      cy.get(issueTimeTracking.numberField).click().type("10");
      issueTimeTracking.closeIssueDetailsModal();
    });
    cy.get(issueTimeTracking.backlogList)
      .contains("This is an issue of type: Task.")
      .click();
    // Assert that the estimation value is still visible (Which is NOT)
    cy.get(issueTimeTracking.numberField);
    cy.contains("No time logged");

    // UPDATE ESTIMATION
    cy.get(issueTimeTracking.numberField).click().type("20");
    issueTimeTracking.closeIssueDetailsModal();
    cy.get(issueTimeTracking.backlogList)
      .contains("This is an issue of type: Task.")
      .click();
    // Assert that the estimation value is still visible (Which is NOT)
    cy.get(issueTimeTracking.numberField);
    cy.contains("No time logged");
    // After reopening issue detail view updated estimation value is still visible (Which is NOT)
    cy.get(issueTimeTracking.numberField).should("have.value", "10");

    // REMOVE ESTIMATION
    cy.get(issueTimeTracking.numberField).clear();
    issueTimeTracking.closeIssueDetailsModal();
    cy.get(issueTimeTracking.backlogList)
      .contains("This is an issue of type: Task.")
      .click();
    // Assert that the estimation value is still cleared (Which is NOT - it's "20")
    cy.get(issueTimeTracking.numberField).should("have.value", "20");
    cy.contains("No time logged");
  });

  it("Time logging functionality", () => {
    // LOG TIME
    cy.get(issueTimeTracking.issueDetails).within(() => {
      cy.get(issueTimeTracking.stopWatchIcon).click();
    });
    cy.get(issueTimeTracking.modalTracking)
      .should("be.visible")
      .within(() => {
        cy.get(issueTimeTracking.placeHolderNumber).eq(0).clear().type("2");
        cy.get(issueTimeTracking.placeHolderNumber).eq(1).clear().type("5");
      });
    issueTimeTracking.clickDoneInModalTracking();
    cy.get(issueTimeTracking.issueDetails).within(() => {
      cy.contains("2h logged");
      cy.should("not.contain", "No time logged");
      cy.contains("5h remaining");
    });

    // REMOVE LOGGED TIME
    cy.get(issueTimeTracking.issueDetails).within(() => {
      cy.get(issueTimeTracking.stopWatchIcon).click();
    });
    cy.get(issueTimeTracking.modalTracking)
      .should("be.visible")
      .within(() => {
        cy.get(issueTimeTracking.placeHolderNumber).eq(0).clear();
        cy.get(issueTimeTracking.placeHolderNumber).eq(1).clear();
      });
    cy.get(issueTimeTracking.modalTracking).contains("Done").click();
    cy.get(issueTimeTracking.issueDetails).within(() => {
      cy.contains("No time logged");
      cy.contains("8h estimated");
    });
  });
});