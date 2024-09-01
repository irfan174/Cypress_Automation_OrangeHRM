// Import the Faker library
const { faker } = require('@faker-js/faker');

//url
export const baseUrl = "https://opensource-demo.orangehrmlive.com/"
//base url title
export const baseUrl_title = "OrangeHRM"

//admin credentials
export const adminUserName = "Admin"
export const adminPassword = "admin123"

//random password generation
function generateRandomPassword() {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

export const emp_firstName = faker.name.firstName();
export const emp_lastName = faker.name.lastName();
export const emp_fullName = emp_firstName+" "+emp_lastName;
export const emp_userName = emp_firstName + emp_lastName;
export const emp_password = generateRandomPassword();