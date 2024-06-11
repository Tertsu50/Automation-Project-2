beforeEach(() => {
    Cypress.config("defaultCommandTimeout", 70000); // Set time out first
    cy.visit("/");
    cy.url().should("eq", `${Cypress.env("baseUrl")}project/board`).then((url) => {
      cy.visit(url + "/board?modal-issue-create=true");
    });
  });

function openIssueDetails() {
  cy.get('[data-testid="board-list:backlog"]')
    .should("be.visible")
    .within(() => {
      cy.get('[data-testid="list-issue"]')
      
        .first()
        .click({ force: true }); // Use 'force: true' if this is nessecary
    });
}

function createNewIssue() {
  cy.get('[data-testid="modal:issue-create"]', { timeout: 60000 }).should(
    "be.visible"
  );
  cy.get('[data-testid="modal:issue-create"]').within(() => {
    
    cy.wait(2000);
    cy.get('[data-testid="select:priority"]').click();
    cy.get('[data-testid="select-option:Highest"]').click();
    cy.get('[data-testid="select:type"]').click();
    cy.get('[data-testid="select-option:Bug"]')
      .wait(5000)
      .trigger("mouseover")
      .trigger("click");
    cy.get('[data-testid="icon:bug"]').should("be.visible");
    cy.get('[data-testid="select:reporterId"]').click();
    cy.get('[data-testid="select-option:Pickle Rick"]').click();
    cy.get('[data-testid="form-field:userIds"]').click();
    cy.get('[data-testid="select-option:Lord Gaben"]').click();
    cy.get('button[type="submit"]').click();
    cy.log("Clicked submit button");
  });
}

function setOriginalEstimate(value) {
  const inputSelector = 'input[placeholder="Number"]';
  cy.get(inputSelector)
    .first()
    .then((input) => {
      if (value === "") {
        cy.wrap(input).clear().should("have.attr", "placeholder", "Number");
      } else {
        cy.wrap(input).clear().type(value);
        cy.contains("Description").click(); // Click to blur input and ensure value is saved
        cy.wrap(input).should("have.value", value);
      }
    });
}

function setTimeValue(value) {
  const inputSelector = 'input[placeholder="Number"]';
  cy.get(inputSelector)
    .first()
    .then((input) => {
      if (value === "") {
        cy.wrap(input).clear().should("have.attr", "placeholder", "Number");
      } else {
        cy.wrap(input).clear().type(value);
        cy.contains("Done").click();
      }
    });
}

function closeTimeEstimation() {
  cy.get('[data-testid="modal:issue-details"]').within(() => {
    cy.get('[data-testid="icon:close"]').first().click();
  });
}

describe("Issue time tracking", () => {
  it("should create issue, add time estimation, edit and delete it", () => {
    createNewIssue();
   
    openIssueDetails();

    // Add time estimation
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      setOriginalEstimate("10");
    });

    closeTimeEstimation();
    cy.wait(3000);
    openIssueDetails();

    // Edit time estimation
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      setOriginalEstimate("20");
    });

    closeTimeEstimation();
    cy.wait(3000);
    openIssueDetails();

    // Clear time estimation
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      setOriginalEstimate("");
    });

    closeTimeEstimation();
    cy.wait(3000);
    openIssueDetails();
    // Check that it worked
    
  });

  it.only("should create issue, log time, update and delete it", () => {
    Cypress.config("defaultCommandTimeout", 70000); // Set time out first

    // Log time
    cy.get('[data-testid="icon:watch"]').click();
    cy.get('[data-testid="modal:timetracking"]').within(() => {
      setTimeValue("5");
    });
    closeTimeEstimation();
    cy.wait(2000);
    openIssueDetails();

    // Edit Time
    cy.get('[data-testid="icon:watch"]').click();
    cy.get('[data-testid="modal:timetracking"]').should("contain", "5h logged");
    cy.get('[data-testid="modal:timetracking"]').within(() => {
        setTimeValue("10");
      });
    closeTimeEstimation();
    cy.wait(2000);
    openIssueDetails();

    // Delete time
    cy.get('[data-testid="icon:watch"]').click();
    cy.get('[data-testid="modal:timetracking"]').should("contain", "10h logged");
    cy.get('[data-testid="modal:timetracking"]').within(() => {
        setTimeValue("0");
      });
      closeTimeEstimation();
    cy.wait(2000);
    openIssueDetails();

    // Check that it works
    cy.get('[data-testid="icon:watch"]').click();
    cy.get('[data-testid="modal:timetracking"]').should("contain", "No time logged");
  });
});