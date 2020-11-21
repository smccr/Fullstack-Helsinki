describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'testuser', password: 'testpassword', name: 'Test User'
    });
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.contains('Log in to application');
    cy.contains('username');
    cy.contains('password');
    cy.get('#login').contains('login');
  });

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser');
      cy.get('#password').type('testpassword');
      cy.get('#login').click();

      cy.contains('Test User logged in');
    });

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wronguser');
      cy.get('#password').type('wrongpassword');
      cy.get('#login').click();

      cy.contains('Wrong credentials');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testuser');
      cy.get('#password').type('testpassword');
      cy.get('#login').click();
    });

    it('A blog can be created', function() {
      cy.contains('New blog').click();
      cy.get('#title').type('Blog title');
      cy.get('#author').type('Blog author');
      cy.get('#url').type('www.blogurl.com');
      cy.get('#submitBlog').click();
    });
  });

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testuser');
      cy.get('#password').type('testpassword');
      cy.get('#login').click();
    });

    it('A blog can be created', function() {
      cy.contains('New blog').click();
      cy.get('#title').type('Blog title');
      cy.get('#author').type('Blog author');
      cy.get('#url').type('www.blogurl.com');
      cy.get('#submitBlog').click();
    });
  });

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testuser');
      cy.get('#password').type('testpassword');
      cy.get('#login').click();
      cy.contains('New blog').click();
      cy.get('#title').type('Blog title');
      cy.get('#author').type('Blog author');
      cy.get('#url').type('www.blogurl.com');
      cy.get('#submitBlog').click();
    });

    it('A blog can be liked', function() {
      cy.contains('Blog title Blog author').contains('view').click();
      cy.contains('Blog title Blog author').contains('0 likes');
      cy.contains('Blog title Blog author').contains('like').click();
      cy.contains('Blog title Blog author').contains('1 likes');
    });
  });

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testuser');
      cy.get('#password').type('testpassword');
      cy.get('#login').click();
      cy.contains('New blog').click();
      cy.get('#title').type('Blog title');
      cy.get('#author').type('Blog author');
      cy.get('#url').type('www.blogurl.com');
      cy.get('#submitBlog').click();
    });

    it('A blog can be deleted', function() {
      cy.contains('Blog title Blog author').contains('view').click();
      cy.contains('Blog title Blog author').contains('Remove').click();

      cy.contains('Blog removed');
    });
  });

  describe.only('Blogs are ordered according to likes', function() {
    beforeEach(function() {

      cy.get('#username').type('testuser');
      cy.get('#password').type('testpassword');
      cy.get('#login').click();

      cy.contains('New blog').click();
      cy.get('#title').type('First Blog title');
      cy.get('#author').type('Blog author');
      cy.get('#url').type('www.blogurl.com');
      cy.get('#submitBlog').click();

      cy.get('#title').type('Second Blog title');
      cy.get('#author').type('Blog author');
      cy.get('#url').type('www.blogurl.com');
      cy.get('#submitBlog').click();

      cy.get('#title').type('Third Blog title');
      cy.get('#author').type('Blog author');
      cy.get('#url').type('www.blogurl.com');
      cy.get('#submitBlog').click();
    });


    // 3 1 2
    it('Blogs are sorted by likes', function() {
      cy.contains('Third Blog title').contains('view').click();
      cy.contains('Third Blog title').contains('like').click();
      cy.wait(200);
      cy.contains('Third Blog title').contains('like').click();
      cy.wait(200);

      cy.contains('First Blog title').contains('view').click();

      cy.contains('First Blog title').contains('like').click();
      cy.wait(200);

      cy.contains('Second Blog title').contains('view').click();

      cy.get('ul.blogs').should($b => {
        expect($b[0].childNodes[0].innerText).to.include('Third Blog');
        expect($b[0].childNodes[1].innerText).to.include('First Blog');
        expect($b[0].childNodes[2].innerText).to.include('Second Blog');
      });
    });
  });
});


