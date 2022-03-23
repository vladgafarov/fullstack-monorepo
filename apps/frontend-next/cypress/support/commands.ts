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

Cypress.Commands.add('login', (email = ' ', password = ' ') => {
   cy.get('input[type=email]').clear().type(email)
   cy.get('input[type=password]').clear().type(password)

   cy.findByRole('button', { name: /войти/i }).click()
})

Cypress.Commands.add('signup', (email, password, name, lastName) => {
   cy.get('input[name=name]').type(name)
   cy.get('input[name=lastName]').type(lastName)
   cy.get('input[type=email]').type(email)
   cy.get('input[type=password]').type(password)

   cy.findByRole('button', { name: /зарегис/i }).click()
})

Cypress.Commands.add('createCourse', (title, description, price) => {
   cy.get('input[name=title]').type(title)
   cy.get('textarea[name=description]').type(description)
   cy.get('input[name=price]').type(price)

   cy.findByRole('button', { name: /создать/i }).click()
})

import '@testing-library/cypress/add-commands'
import 'cypress-wait-until'
