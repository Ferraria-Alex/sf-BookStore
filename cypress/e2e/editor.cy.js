describe('Editor Tests', () => {
    it('Adding a new editor - SUCCESS', () => {
        cy.visit('http://127.0.0.1:8000/editor/new');
        cy.wait(300);
        cy.get('#editor_name').type('Ghibson&Co');
        cy.get('.btn').click();
        cy.wait(300);
        cy.contains('table tr', 'Ghibson&Co').should('exist');
    })

    it('Adding a new editor - DUPLICATED ENTRY', () => {
        cy.visit('http://127.0.0.1:8000/editor/new');
        cy.wait(300);
        cy.get('#editor_name').type('Ghibson&Co');
        cy.get('.btn').click();
        cy.wait(300);
        cy.get('.container > .break-long-words').contains("An exception");
    })

    it('Adding a new editor - EMPTY STRING', () => {
        cy.visit('http://127.0.0.1:8000/editor/new');
        cy.wait(300);
        cy.get('#editor_name').type('   ');
        cy.get('.btn').click();
        cy.wait(300);
        cy.contains('#error_msg', 'Empty Data').should('exist');
    })

    it('Deletes All Editors - SUCCESS', ()=>{
        //RESET
        cy.visit('http://127.0.0.1:8000/editor');
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