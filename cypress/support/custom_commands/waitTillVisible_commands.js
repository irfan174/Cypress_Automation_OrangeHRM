Cypress.Commands.add("waitTillVisible",(selector,timeout=10000)=>{
    cy.get(selector,{timeout}).should("be.visible")
});