describe('Tried saving an empty string', () => {
  it('passes', () => {
    //Arrange
    cy.visit('http://127.0.0.1:8000/category/new');

    //Act
    cy.get('.btn').click();

    //Assert
    cy.visit('http://127.0.0.1:8000/category');
    cy.get('td').contains('no records found');
  })
})