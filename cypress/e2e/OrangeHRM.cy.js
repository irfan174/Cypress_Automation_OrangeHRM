import * as variables from './variables/variables'

describe('OrangeHRM site End to End Testing', () => {

  const employeeDataFile = "employeeData.json" // File to save employee data
  const empUserName_forFile = variables.emp_fullName
  const empPassword_forFile = variables.emp_password

  before(() => {

    cy.visit(variables.baseUrl)
    cy.title().should("eq", variables.baseUrl_title)
    cy.waitTillVisible("[type='submit']") // Wait till Login button is visible
    cy.adminLogin(variables.adminUserName, variables.adminPassword)
    
  })

  it('Full automation flow after Login', () => {
    
    //Validate the dashboard
    cy.waitTillVisible('h6')
    cy.get('h6').should("have.text", "Dashboard")

    //Locate PIM from left menu and click
    cy.get("span").contains("PIM").as('leftMenu_PIM')
    cy.get('@leftMenu_PIM').click()

    //Validate the PIM page
    cy.waitTillVisible('h6')
    cy.get('h6').should("have.text", "PIM")

    //EXTRA = Validate Employee list from nav bar items is active
    cy.verifyNavbarItemActive('Employee List', '--visited')

    //click on Add Employee Button
    cy.get("button[type='button']").contains("Add").as('addEmployee_button')
    cy.get('@addEmployee_button').click()

    //Validate the Add Employee page
    cy.waitTillVisible('.orangehrm-main-title')
    cy.get('.orangehrm-main-title').should("have.text", "Add Employee")

    //EXTRA = Validate Add Employee from nav bar items is active
    cy.verifyNavbarItemActive('Add Employee', '--visited');

    //Create New employee with login details
    cy.createNewEmployee(variables.emp_firstName, variables.emp_lastName, variables.emp_userName, variables.emp_password)

    // New Employee creation successful message
    cy.waitTillVisible('.oxd-text--toast-message')
    cy.get('.oxd-text--toast-message').should("have.text", "Successfully Saved")

    //Validate New employee profile page
    cy.waitTillVisible('h6')
    cy.get('h6').should("contain.text", variables.emp_fullName)

    // Save Employee Details to a file
    cy.writeFile(`cypress/fixtures/${employeeDataFile}`,{
      empUserName_forFile,
      empPassword_forFile
    });

    //Search by Employee ID from Dashboard

    //Search by Employee Name from Directory

    //Locate Directory from left menu and click
    cy.get("span").contains("Directory").as('leftMenu_Directory')
    cy.get('@leftMenu_Directory').click()

    //Validate the Directory page
    cy.waitTillVisible('h6')
    cy.get('h6').should("have.text", "Directory")
    cy.get('h5').should("have.text", "Directory")

    //Search by Employee name
    cy.searchNewEmployee(variables.emp_firstName, variables.emp_fullName)



    
  })

  after(() => {
    
    // clear employeedata object after all tests are completed
    cy.writeFile(`cypress/fixtures/${employeeDataFile}`,{});
  })
})