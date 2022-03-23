// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

declare global {
   namespace Cypress {
      interface Chainable {
         /**
          * Custom command to login.
          * @param email ' '
          * @param password ' '
          * @example cy.login('rico@test.com', '123456')
          */
         login(email?: string, password?: string): Chainable<Element>

         /**
          * Custom command to signup.
          * @example cy.signup('rico@test.com', '123456', 'Jhon', 'Gold')
          */
         signup(
            email: string,
            password: string,
            name: string,
            lastName: string
         ): Chainable<Element>

         /**
          * Custom command to create course.
          * @example cy.createCourse('Title', 'desc', '1200')
          */
         createCourse(
            title: string,
            description: string,
            price: string
         ): Chainable<Element>
      }
   }
}

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
