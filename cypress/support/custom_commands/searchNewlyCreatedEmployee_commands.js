
import './waitTillVisible_commands'

Cypress.Commands.add('searchNewEmployee', (firstName, fullName ) => {

    //locate Employee Name search field 
    cy.get("input[placeholder='Type for hints...']").as('empName_searchField') 

    //type Employee first name
    cy.get('@empName_searchField').type(firstName)

    //API resonse showing Employee full name
    cy.waitTillVisible('.oxd-autocomplete-option > span') // wait till response appears
    cy.get('.oxd-autocomplete-option > span').as('searchResponse_empFullName') 

    //Click on the response
    cy.get('@searchResponse_empFullName').click()

    //locate the Search button
    cy.get("button[type='submit']").as('search_button')

    //Click on the search button
    cy.get('@search_button').click()

    cy.get(".orangehrm-directory-card-header")
      .invoke('text')
      .then((text) => {
        const foundEmployeeName_inCard = text.replace(/\s+/g, ' ').trim(); // Collapse multiple spaces into one and trim
        expect(foundEmployeeName_inCard).to.eq(fullName);
      });
    
    
})