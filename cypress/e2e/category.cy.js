describe('Category Tests', () => {
  it('Adding a new category - SUCCESS', () => {
    //Arrange
    cy.visit('http://127.0.0.1:8000/category/new');
    cy.wait(300);
    //Act
    cy.get('#category_label').type('Exemple1');
    cy.get('.btn').click();
    cy.wait(300);
    //Assert
    cy.contains('table tr', 'Exemple1').should('exist');
  })

  it('Adding new category - Duplicated entry error', () => {
    //Arrange
    cy.visit('http://127.0.0.1:8000/category/new');
    cy.wait(300);
    //Act
    cy.get('#category_label').type('Exemple1');
    cy.get('.btn').click();
    cy.wait(300);
    //Assert
    cy.get('.container > .break-long-words').contains("An exception");
  })

  it('Update an entry - SUCCCESS', () =>{
    cy.visit('http://127.0.0.1:8000/category/new');
    cy.wait(300);
    cy.get('#category_label').type('Exemple2');
    cy.get('.btn').click();
    cy.wait(300);
    cy.visit('http://127.0.0.1:8000/category');
    cy.get('tbody > :nth-child(2) > :nth-child(3) > :nth(1)').click();
    cy.wait(300);
    cy.get('#category_label').clear().type('Exemple2.1');
    cy.get('[name="category"] > .btn').click();
    cy.wait(300);
    cy.get('h1').contains('Category index');
    cy.get('.table').contains('Exemple2.1');
  })

  it('Update an entry - DUPLICATED ENTRY', () => {
    //Arrange
    cy.visit('http://127.0.0.1:8000/category');
    cy.get('tbody > :nth-child(1) > :nth-child(3) > :nth(1)').click();
    cy.wait(300);
    //Act
    cy.get('#category_label').clear().type('Exemple2.1');
    cy.get('[name="category"] > .btn').click();
    cy.wait(300);
    //Assert
    cy.get('.container > .break-long-words').contains("An exception");
  })

  it('Deletes All Category - SUCCESS', ()=>{
    //RESET
    cy.visit('http://127.0.0.1:8000/category');
    clickVisibleButton();
  })

  function clickVisibleButton() {
    cy.get('tbody').then( $mainContainer => {
        const isVisible = $mainContainer.find(':nth-child(1) > :nth-child(3) > :nth(0)').is( ':visible' );
        if (isVisible) {
          cy.wait(300);
          cy.get('tbody > :nth-child(1) > :nth-child(3) > :nth(0)').click();
          cy.wait(300);
          cy.get('.btn').click();
          cy.wait(300);
          clickVisibleButton();
        } else {
          return;
        }
    });
  }
})