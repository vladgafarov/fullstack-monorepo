import * as jwt from 'jsonwebtoken'

describe('Create course', function () {
   beforeEach(function () {
      cy.fixture('admin').then(admin => {
         this.admin = admin

         const token = jwt.sign(
            {
               id: admin.id,
               name: admin.name,
               lastName: admin.lastName,
               email: admin.email,
               role: admin.role,
            },
            Cypress.env('JWT_SECRET')
         )
         cy.setCookie('access-token', token)
      })

      cy.visit('/admin/add-course')
   })

   it('should create course', function () {
      cy.findByText(`${this.admin.name} ${this.admin.lastName}`)
      cy.createCourse(`test ${Date.now()}`, 'desc', '999')
      cy.findByText(/пост создан/i)
      cy.url().should('match', /course\//i)
   })

   it('should check error', function () {
      cy.createCourse(`test ${Date.now()}`, ' ', '99')
      cy.findByText(/создать/i)
      cy.findByText(/минимум 2 символа/i)
      cy.findByText(/минимум 100/i)
   })
})
