Cypress.Commands.add('adminLogin', (userName, password ) => {

    // Login using Admin credentials.

    //locate username, password input fields and login button using alias
    cy.get("input[name='username'").as('userName_field') 
    cy.get("input[name='password'").as('password_field') 
    cy.get("[type='submit']").as('login_button')
    
    //type username, password and click the login button
    cy.get('@userName_field').type(userName)
    cy.get('@password_field').type(password)
    cy.get('@login_button').click()
    
    
})