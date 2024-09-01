Cypress.Commands.add('createNewEmployee', (firstName, lastName, userName, password ) => {

    //locate the Employee id field and grab the employee id
    cy.get('label').contains("Employee Id").parent().siblings('div').find('input').as('empID_field')
    cy.get('@empID_field')
    .invoke('val')
    .then((value) => {
      // Store the employee id value using alias
      cy.wrap(value).as('empID');
    })

    //locate first name, last name, login details checkbox, username, password, and confirmation password input fields and Save button using alias
    cy.get("input[name='firstName'").as('empFirstName_field') 
    cy.get("input[name='lastName']").as('empLastName_field') 
    cy.get("input[type='checkbox']").as('loginDetails_checkbox')
    cy.get('@loginDetails_checkbox').click({ force: true })

    cy.get('label').contains("Username").parent().siblings('div').find('input').as('empUserName_field')
    cy.get('label').contains("Password").parent().siblings('div').find('input').as('empPassword_field')
    cy.get('label').contains("Confirm Password").parent().siblings('div').find('input').as('empConfirmPass_field')
    cy.get("[type='submit']").as('save_button')

    
    //type username, password and click the login button
    cy.get('@empFirstName_field').type(firstName)
    cy.get('@empLastName_field').type(lastName)
    
    cy.get('@empUserName_field').type(userName)
    cy.get('@empPassword_field').type(password)
    cy.get('@empConfirmPass_field').type(password)
    cy.get('@save_button').click()
    
    
})