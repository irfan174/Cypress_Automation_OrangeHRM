
import './waitTillVisible_commands'

Cypress.Commands.add('searchNewEmployeeById', (id) => {

  //Search Employee by ID from PIM
  cy.get('label').contains("Employee Id").parent().siblings('div').find('input').as('empID_field')
  cy.get('@empID_field').type(id)

  //locate the Search button
  cy.get("button[type='submit']").as('search_button')

  //Click on the search button
  cy.get('@search_button').click()

  //Match with the text (1) Record Found
  //cy.waitTillVisible('.orangehrm-horizontal-padding > .oxd-text') //wait till the text is visible
  cy.get('.orangehrm-horizontal-padding > .oxd-text').as('recordFound_text')
  cy.get('@recordFound_text').invoke('text').should('equal', '(1) Record Found')

  //Ensure one row is appeared
  cy.get('.oxd-table-card').as('employee_row')
  cy.get('@employee_row').should('have.length',1)

  //Ensure the employee id in the row
  cy.get('.oxd-table-card > .oxd-table-row > :nth-child(2) > div').as('empId_inRow')
  cy.get('@empId_inRow').invoke('text').should('equal', id)






})


Cypress.Commands.add('searchNewEmployeeByName', (firstName, fullName ) => {

  //Search Employee by Name from Dirctory
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