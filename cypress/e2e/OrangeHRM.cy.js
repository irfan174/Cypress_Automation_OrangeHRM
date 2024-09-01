import * as variables from './variables/variables'

describe('OrangeHRM site End to End Testing', () => {

  const employeeDataFile = "employeeData.json" // File to save employee data
  const empUserName = variables.emp_fullName
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
    cy.searchNewEmployee(variables.emp_firstName, variables.emp_fullName)

    //logout by Admin
    cy.get("span img").click()
    cy.get("li a").contains("Logout").click()
    cy.waitTillVisible("h5")

    // Log In Using Newly Created Employee Creds 
    cy.fixture(employeeDataFile).then((employee)=>{
      //Login with employee creds.
      cy.Login(empUserName, empPassword)
      // Assert that the Newly Created Employee Full Name is showing beside the profile icon.
      cy.get("p.oxd-userdropdown-name").should("have.text",variables.emp_fullName)


    
  })

  after(() => {
    
    // clear employeedata object after all tests are completed
    cy.writeFile(`cypress/fixtures/${employeeDataFile}`,{});
  })
})
})