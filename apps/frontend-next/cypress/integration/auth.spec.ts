const faker = require('faker')

describe('Auth', () => {
   const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
   }

   describe('SignUp', () => {
      beforeEach(() => {
         cy.visit('/signup')
      })

      it('should signup', () => {
         cy.signup(user.email, user.password, user.name, user.lastName)

         cy.findByText(/для подтверждения аккаунта/i)
      })

      it('should not signup', () => {
         cy.signup(user.email, user.password, user.name, user.lastName)

         cy.findByText(/существует/i)
      })
   })

   describe('LogIn', () => {
      beforeEach(() => {
         cy.visit('/login')
      })

      it('should login', () => {
         cy.login(user.email, user.password)

         cy.findByText(/вход выполнен успешно/i)
      })

      it('should not login', () => {
         cy.login()

         cy.findByText(/обязательно/i)
      })
   })

   describe('Reset password', () => {
      beforeEach(() => {
         cy.visit('/reset-password')
      })

      it('should send email for reset password', () => {
         cy.get('input').type('fake@fake.com')
         cy.findByRole('button', { name: /пароль/i }).click()

         cy.findByText(/успешно/i)
      })

      it('should notify on empty input', () => {
         cy.findByRole('button', { name: /пароль/i }).click()

         cy.findByText(/обязательно/i)
      })
   })
})
