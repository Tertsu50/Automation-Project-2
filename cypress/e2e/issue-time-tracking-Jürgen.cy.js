  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board?modal-issue-create=true");
        issueNewModal.createIssue();

        cy.contains(issueCreatedConfirmation).should("be.visible");
        cy.get(backlog).should("be.visible").contains(issueTitle).click();
      });
  });

  // ASSIGNMENT 2.1 //

  it("Should add, update & clear estimated time in an issue, validating the changes", () => {
    const issueTimeTracking = new IssueTimeTracking();

    // Validate that no time is logged in a newly created issue
    issueTimeTracking.validateNoTimeLoggedShouldBeVisible();

    // Validate that the added estimate is retained
    issueTimeTracking.addTimeAndValidate(estimatedTime);
    issueTimeTracking.validateEstimatedTimeShouldBeVisible(estimatedTime);

    // Validate that new updated estimate is shown after adding
    issueTimeTracking.addTimeAndValidate(estimatedTimeUpdated);
    issueTimeTracking.validateEstimatedTimeShouldBeVisible(
      estimatedTimeUpdated
    );
    issueTimeTracking.clearTimeField();

    // Validate that entered estimates don't exist anymore
    issueTimeTracking.validateEstimatedTimeShouldNotExist(estimatedTime);
    issueTimeTracking.validateEstimatedTimeShouldNotExist(estimatedTimeUpdated);

    // Validate no time is logged
    issueTimeTracking.validateNoTimeLoggedShouldBeVisible();
  });

  // ASSIGNMENT 2.2 //

  it("Should add and remove logged time values", () => {
    const issueTimeTracking = new IssueTimeTracking();

    // Validate that added estimate is shown after adding
    issueTimeTracking.addTimeAndValidate(estimatedTime);
    issueTimeTracking.validateEstimatedTimeShouldBeVisible(estimatedTime);

    // Validate that logged and remaining time are visible
    issueTimeTracking.openTimeTrackingAndChangeLoggedTime(
      loggedTime,
      remainingTime
    );
    issueTimeTracking.validateLoggedTimeShouldBeVisible(loggedTime);
    issueTimeTracking.validateRemainingTimeShouldBeVisible(remainingTime);
    issueTimeTracking.validateEstimatedTimeShouldNotExist(estimatedTime);

    // Validate that logged and remaining time are updated and visible
    issueTimeTracking.openTimeTrackingAndChangeLoggedTime(
      loggedTimeUpdated,
      remainingTimeUpdated
    );
    issueTimeTracking.validateLoggedTimeShouldBeVisible(loggedTimeUpdated);
    issueTimeTracking.validateRemainingTimeShouldBeVisible(
      remainingTimeUpdated
    );
    issueTimeTracking.validateEstimatedTimeShouldNotExist(estimatedTimeUpdated);

    // Validate that "No time logged" is not visible
    issueTimeTracking.validateNoTimeLoggedShouldNotExist();

    // Validate that logged time is cleared and "No time logged" is visible
    issueTimeTracking.openTimeTrackingAndClearLoggedTime();
    issueTimeTracking.validateNoTimeLoggedShouldBeVisible();
    issueTimeTracking.validateLoggedTimeShouldNotExist(loggedTime);
    issueTimeTracking.validateRemainingTimeShouldNotExist(remainingTime);
    issueTimeTracking.validateEstimatedTimeShouldBeVisible(estimatedTime);
  });