describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'admin',
      username: 'admin',
      password: 'admin',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.get('#username');
    cy.get('#password');
    cy.get('#login-button');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('admin');
      cy.get('#password').type('admin');
      cy.get('#login-button').click();

      cy.contains('logged in');
      cy.get('.notification')
        .should('contain', 'Succesful Log In')
        .and('have.css', 'color', 'rgb(0, 128, 0)');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('admin');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('.notification')
        .should('contain', 'Wrong usename or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'admin',
        password: 'admin',
      }).then((response) => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body));
        cy.visit('http://localhost:3000');
      });
    });

    it('A blog can be created', function () {
      cy.contains('New Blog').click();
      cy.get('#title').type('test blog');
      cy.get('#author').type('tester');
      cy.get('#url').type('www.test.com');

      cy.get('#create-button').click();
      cy.get('html').should('contain', 'test blog');
      cy.get('html').should('contain', 'tester');
    });

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog',
          author: 'first author',
          url: 'www.first.com',
        });
        cy.createBlog({
          title: 'second blog',
          author: 'second author',
          url: 'www.second.com',
        });
        cy.createBlog({
          title: 'third bloge',
          author: 'third author',
          url: 'www.third.com',
        });
      });

      it('one of the blogs can be liked', function () {
        cy.contains('second blog').parent().parent().as('theBlog');
        cy.get('@theBlog').contains('button', 'View').click();
        cy.get('@theBlog').contains('button', 'like').click();
        cy.get('@theBlog').contains('Likes: 1');
      });

      it('a blog can be deleted by use who created it', function () {
        cy.contains('second blog').parent().parent().as('theBlog');
        cy.get('@theBlog').contains('button', 'View').click();
        cy.get('@theBlog').contains('button', 'Remove').click();
        cy.get('.bloglist').should('not.contain', 'second blog');

        cy.get('.notification')
          .should('contain', 'Blog "second blog" by second author was removed')
          .and('have.css', 'color', 'rgb(0, 128, 0)');
      });
    });
  });
});

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('loggedUser')).token
      }`,
    },
  });

  cy.visit('http://localhost:3000');
});
