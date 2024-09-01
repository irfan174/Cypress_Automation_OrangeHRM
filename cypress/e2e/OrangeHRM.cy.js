import * as variables from './variables/variables'

describe('OrangeHRM site End to End Testing', () => {

  const employeeDataFile = "employeeData.json" // File to save employee data
  const empUserName = variables.emp_userName
  const empPassword = variables.emp_password

  before(() => {

    cy.visit(variables.baseUrl)
    cy.title().should("eq", variables.baseUrl_title)
    cy.waitTillVisible("[type='submit']") // Wait till Login button is visible
    cy.Login(variables.adminUserName, variables.adminPassword)
    
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
      empUserName,
      empPassword
    });

    //Search by Employee ID from PIM
    //click on PIM
    cy.get(':nth-child(2) > .oxd-main-menu-item').click()
    
    //Validate the PIM page
    cy.waitTillVisible('h5')
    cy.get('h5').should("have.text", "Employee Information")

    //EXTRA = Validate Employee list from nav bar items is active
    cy.verifyNavbarItemActive('Employee List', '--visited')
    //grab the employee id value from create new employee 
    cy.get('@empID').then((value) => {
      cy.log(value)
      // send the employee id to search new created employee file
      cy.searchNewEmployeeById(value)
    })


    //Search by Employee Name from Directory

    //Locate Directory from left menu and click
    cy.get("span").contains("Directory").as('leftMenu_Directory')
    cy.get('@leftMenu_Directory').click()

    //Validate the Directory page
    cy.waitTillVisible('h6')
    cy.get('h6').should("have.text", "Directory")
    cy.get('h5').should("have.text", "Directory")

    //Search by Employee name
    cy.searchNewEmployeeByName(variables.emp_firstName, variables.emp_fullName)

    //logout by Admin
    cy.Logout()

    // Log In Using Newly Created Employee 
    cy.fixture(employeeDataFile).then((employee)=>{

      cy.Login(empUserName, empPassword)
      // Assert that the Newly Created Employee Full Name is showing beside the profile icon.
      cy.get("p.oxd-userdropdown-name").should("have.text",variables.emp_fullName)
    })

    //Update employee info
    cy.get(':nth-child(3) > .oxd-main-menu-item').as('leftMenu_myInfo')
    cy.get('@leftMenu_myInfo').click()

    //Validate employee person details page
    cy.waitTillVisible('.orangehrm-edit-employee-content > :nth-child(1) > .oxd-text--h6')

    //Scroll down to Gender section
    cy.get(':nth-child(5) > :nth-child(2) > :nth-child(2) > :nth-child(1) > :nth-child(1)').as('genderSection')
    cy.get('@genderSection').scrollIntoView()

    //Click on Male gender checkbox
    cy.get(':nth-child(1) > :nth-child(2) > .oxd-radio-wrapper > label > .oxd-radio-input').as('maleGender_checkbox')
    cy.get('@maleGender_checkbox').click()

    //Click on Save button of this section
    cy.get(':nth-child(1) > .oxd-form > .oxd-form-actions > .oxd-button').as('saveButton_gender')
    cy.get('@saveButton_gender').click()

    //Success message for saving gender
    cy.waitTillVisible('.oxd-text--toast-message')
    cy.get('.oxd-text--toast-message').should("have.text", "Successfully Updated")

    //Scroll down to blood type section
    cy.get('.orangehrm-card-container > .oxd-form > .oxd-form-row > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > .oxd-input-group__label-wrapper').as('bloodType_field')
    cy.get('@bloodType_field').scrollIntoView()

    //Click on the dropdown and select O+
    cy.get('.orangehrm-card-container > .oxd-form > .oxd-form-row > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input').as('bloodType_dropdown')
    cy.get('@bloodType_dropdown').click()
    cy.get('.oxd-select-dropdown').should('be.visible').contains('O+').click();

    //Verify that the O+ is selected
    cy.get('.orangehrm-card-container > .oxd-form > .oxd-form-row > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input').as('bloodGroup_selected')
    cy.get('@bloodGroup_selected').should('have.text', 'O+')

    //Click Save button of this section
    cy.get('.orangehrm-card-container > .oxd-form > .oxd-form-actions > .oxd-button').as('saveButton_bloodGroup')
    cy.get('@saveButton_bloodGroup').click()

    //Success message for saving blood group
    cy.waitTillVisible('.oxd-text--toast-message')
    cy.get('.oxd-text--toast-message').should("have.text", "Successfully Updated")

    //logout by Newly created Employee
    cy.Logout()



  
})
after(() => {
    
  // clear employeedata object after all tests are completed
  cy.writeFile(`cypress/fixtures/${employeeDataFile}`,{});
})
})