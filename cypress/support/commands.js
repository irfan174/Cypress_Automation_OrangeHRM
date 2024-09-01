// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//get suggestions of methods after typing cy.
/// <reference types="cypress" />

// In cypress/support/commands.js
import './custom_commands/logIn_commands'
import './custom_commands/waitTillVisible_commands'
import './custom_commands/validateActiveNavbarItems_commands'
import './custom_commands/createNewEmployee_commands'
import './custom_commands/searchNewlyCreatedEmployee_commands'
import './custom_commands/logout_commands'
