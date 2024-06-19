describe('Issue details editing', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
      });
    });
  
  
    it('Should update type, status, assignees, reporter, priority successfully', () => {
      getIssueDetailsModal().within(() => {
        cy.get('[data-testid="select:type"]').click('bottomRight');
        cy.get('[data-testid="select-option:Story"]')
            .trigger('mouseover')
            .trigger('click');
        cy.get('[data-testid="select:type"]').should('contain', 'Story');
  
        cy.get('[data-testid="select:status"]').click('bottomRight');
        cy.get('[data-testid="select-option:Done"]').click();
        cy.get('[data-testid="select:status"]').should('have.text', 'Done');
  
        cy.get('[data-testid="select:assignees"]').click('bottomRight');
        cy.get('[data-testid="select-option:Lord Gaben"]').click();
        cy.get('[data-testid="select:assignees"]').click('bottomRight');
        cy.get('[data-testid="select-option:Baby Yoda"]').click();
        cy.get('[data-testid="select:assignees"]').should('contain', 'Baby Yoda');
        cy.get('[data-testid="select:assignees"]').should('contain', 'Lord Gaben');
  
        cy.get('[data-testid="select:reporter"]').click('bottomRight');
        cy.get('[data-testid="select-option:Pickle Rick"]').click();
        cy.get('[data-testid="select:reporter"]').should('have.text', 'Pickle Rick');
  
        cy.get('[data-testid="select:priority"]').click('bottomRight');
        cy.get('[data-testid="select-option:Medium"]').click();
        cy.get('[data-testid="select:priority"]').should('have.text', 'Medium');
      });
    });
  
    it('Should update title, description successfully', () => {
      const title = 'TEST_TITLE';
      const description = 'TEST_DESCRIPTION';
  
      getIssueDetailsModal().within(() => {
        cy.get('textarea[placeholder="Short summary"]')
          .clear()
          .type(title)
          .blur();
  
        cy.get('.ql-snow')
          .click()
          .should('not.exist');
  
        cy.get('.ql-editor').clear().type(description);
  
        cy.contains('button', 'Save')
          .click()
          .should('not.exist');
  
        cy.get('textarea[placeholder="Short summary"]').should('have.text', title);
        cy.get('.ql-snow').should('have.text', description);
      });
    });
  
    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
  
  
    /*
    BONUS task : 
    ASSIGNMENT 3: SOLVE JAVASCRIPT TASKS (BONUS) : 
    Task 1
    10/06/2024
    */
  
    const expectedLength = 5
    let arrayPriority = []
  
    function addFirstValue() {
  
      cy.get('[data-testid="select:priority"]').within(() => {
        cy.get('[data-testid="icon:arrow-up"]')
        .first()
        arrayPriority.push('High');
        cy.log('Added value:', 'High');
        cy.log('Current array length:', arrayPriority.length);
      });
      
    }
  
    function addAllValues() {
  
      cy.get('[data-testid="select:priority"]').click()
        
        cy.get('[data-select-option-value="5"]')
        arrayPriority.push('Highest');
        cy.log('Added value:', 'Highest');
        cy.log('Current array length:', arrayPriority.length);
  
        cy.get('[data-select-option-value="3"]')
        arrayPriority.push('Medium');
        cy.log('Added value:', 'Medium');
        cy.log('Current array length:', arrayPriority.length);
  
        cy.get('[data-select-option-value="2"]')
        arrayPriority.push('Low');
        cy.log('Added value:', 'Low');
        cy.log('Current array length:', arrayPriority.length);
  
        cy.get('[data-select-option-value="1"]')
        arrayPriority.push('Lowest');
        cy.log('Added value:', 'Lowest');
        cy.log('Current array length:', arrayPriority.length);
    }
  
    it('Should edit the priority level of issue', () => {
      cy.get('[data-testid="modal:issue-details"]').within(() => {
        addFirstValue();
        addAllValues();
      });
  
      cy.get('[data-testid="select:priority"]').should(() => {
        expect(arrayPriority).to.have.length(expectedLength);
      }); 
  
    });
  
    /*
    BONUS task : 
    ASSIGNMENT 3: SOLVE JAVASCRIPT TASKS (BONUS) : 
    Task 2
    12/06/2024
    */
  
    it('Should check reporter\'s name has only characters', () => {
      cy.get('[data-testid="modal:issue-details"]').within(() => {
        cy.get('[data-testid="select:reporter"]')
        .invoke('text')
        .should('match', /^[A-Za-z\s]+$/);
  
      });
  
    });
  
  });