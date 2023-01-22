describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Masukkan email"]').should('be.visible');
    cy.get('input[placeholder="Masukkan password"]').should('be.visible');
    cy.get('button').contains(/^Masuk$/).should('be.visible');
  });

  it('should display alert when username is empty', () => {
    cy.get('button').contains(/^Masuk$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not alowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Masukkan email"]').type('fakemail@mail.com');
    cy.get('button').contains(/^Masuk$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not alowed to be empty');
    });
  });

  it('should display alert when username or password is wrong', () => {
    cy.get('input[placeholder="Masukkan email"]').type('fakemail@mail.com');
    cy.get('input[placeholder="Masukkan password"]').type('fakepassword123');
    cy.get('button').contains(/^Masuk$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage if login success', () => {
    cy.get('input[placeholder="Masukkan email"]').type('faruqah7@gmail.com');
    cy.get('input[placeholder="Masukkan password"]').type('123456');
    cy.get('button').contains(/^Masuk$/).click();

    cy.get('button').contains(/Logout$/).should('be.visible');
  });
});
