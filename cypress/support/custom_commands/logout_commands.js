Cypress.Commands.add('Logout', () => {

    cy.get("span img").as('userProfile_img')
    cy.get('@userProfile_img').click()
    cy.get("li a").contains("Logout").click()
    cy.waitTillVisible("h5")
    
    
})