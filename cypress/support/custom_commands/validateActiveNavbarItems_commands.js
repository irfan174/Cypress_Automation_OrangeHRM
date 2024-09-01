Cypress.Commands.add('verifyNavbarItemActive', (expectedText, activeClass) => {
    
    cy.get('nav.oxd-topbar-body-nav ul li').each(($el) => {
      if ($el.text().includes(expectedText)) 
        {
            cy.wrap($el).should('have.class', activeClass); // Validate the active item has the active class
        } 
        else 
        {
            cy.wrap($el).should('not.have.class', activeClass); // validate other items are not active
        }
    })
  })