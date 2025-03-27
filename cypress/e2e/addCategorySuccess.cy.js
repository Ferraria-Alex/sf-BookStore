describe('Succesfully create a new category', () => {
  it('passes', () => {
    //Arrange
    cy.visit('http://127.0.0.1:8000/category/new');

    //Act
    cy.get('#category_label').type('Exemple1');
    cy.get('.btn').click();

    //Assert
    cy.get('h1').contains('Category index');
    cy.get('.table').contains('Exemple1');

    //RESET
    cy.get('tbody > :nth-child(1) > :nth-child(3) > :nth(0)').click();
    cy.get('.btn').click();
  })
})