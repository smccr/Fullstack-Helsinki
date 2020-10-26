describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'testuser', password: 'testpassword', name: 'Test User'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.get('#login').contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wronguser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login').click()

      cy.contains('Wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login').click()
    })

    it('A blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('Blog title')
      cy.get('#author').type('Blog author')
      cy.get('#url').type('www.blogurl.com')
      cy.get('#submitBlog').click()
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login').click()
    })

    it('A blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('Blog title')
      cy.get('#author').type('Blog author')
      cy.get('#url').type('www.blogurl.com')
      cy.get('#submitBlog').click()
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login').click()
      cy.contains('New blog').click()
      cy.get('#title').type('Blog title')
      cy.get('#author').type('Blog author')
      cy.get('#url').type('www.blogurl.com')
      cy.get('#submitBlog').click()
    })

    it('A blog can be liked', function() {
      cy.contains('Blog title Blog author').contains('view').click()
      cy.contains('Blog title Blog author').contains('0 likes')
      cy.contains('Blog title Blog author').contains('like').click()
      cy.contains('Blog title Blog author').contains('1 likes')
    })
  })
})


