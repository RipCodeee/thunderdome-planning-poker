describe('The Department Page', () => {
  describe('Unauthenicated User', () => {
    it('redirects to login for unauthenticated user', function () {
      cy.visit('/organization/bbaf82ef-a2d3-4e9a-b824-5e56a03ac3aa/department/bbaf82ef-a2d3-4e9a-b824-5e56a03ac3aa')

      cy.url().should('include', '/login')
    })
  })

  describe('Guest User', () => {})

  describe('Registered User', () => {
    beforeEach(() => {
      // seed a user in the DB that we can control from our tests
      cy.createUser()
    })

    it('successfully loads for authenticated registered user', function () {
      cy.login(this.currentUser)

      cy.createUserOrganization(this.currentUser).then(() => {
        cy.createUserDepartment(this.currentUser, this.currentOrganization.id).then(() => {
          cy.visit(`/organization/${this.currentOrganization.id}/department/${this.currentDepartment.id}`)

          cy.get('h1').should('contain', `Department: Test Department`)
        })
      })

      // cleanup our user (for some reason can't access this context in after utility
      cy.logout(this.currentUser)
    })
  })
})