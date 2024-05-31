/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //open issue detail modal with title from line 16  
    cy.contains(issueTitle).click();
    });
  });

  //issue title, that we are testing with, saved into variable
  const issueTitle = 'This is an issue of type: Task.';

  it('Should delete issue successfully', () => {
    //add steps to delete issue
  });

  it('Should cancel deletion process successfully', () => {
    //add steps to start deletion proces but cancel it

    it("Assignment 4: Test Case 1: Issue Deletion_POM", () => {
      // Use the Page Object Model method to delete an issue
      IssueModal.clickDeleteButton();
      IssueModal.confirmDeletion();
  
      // Verify the issue is deleted
      cy.get('[data-testid="list-issue"]')
        .first()
        .should("not.contain", "This is an issue of type: Task.");
      });
      
  });
});