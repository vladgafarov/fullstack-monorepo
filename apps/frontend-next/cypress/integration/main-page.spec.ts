import { aliasQuery } from '../utils/graphql'

describe('Main page', () => {
   beforeEach(() => {
      cy.visit('/')

      cy.intercept('POST', 'http://localhost:3000/graphql', req => {
         aliasQuery(req, 'GetCourses')
      })
   })

   it('should be with static button', () => {
      cy.findByRole('button', { name: /вперед/i }).should('exist')
   })

   it('should load 3 courses', () => {
      cy.findByText(/загрузка/i).should('not.exist')

      cy.get('h1')
         .contains('Последние курсы')
         .next()
         .children()
         .should('have.length', 3)
   })

   it('should toast fail on attempt to sign up for course without being logged in', () => {
      cy.findByText(/загрузка/i).should('not.exist')

      cy.get('.grid')
         .children()
         .first()
         .findByRole('button', { name: /записаться/i })
         .click()

      cy.findAllByText(/необходимо/i).should('exist')
   })

   it('should navigate to courses page', () => {
      cy.findByText(/загрузка/i).should('not.exist')

      cy.findByRole('button', { name: /посмотреть/i }).click()

      cy.url().should('match', /courses/i)
   })
})
