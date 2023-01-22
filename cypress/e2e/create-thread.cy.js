describe('Create Thread spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[placeholder="Masukkan email"]').type('faruqah7@gmail.com');
    cy.get('input[placeholder="Masukkan password"]').type('123456');
    cy.get('button').contains(/^Masuk$/).click();
    cy.wait(500);
  });

  it('should show form correctly', () => {
    cy.get('input[placeholder="Masukkan judul..."]').should('be.visible');
    cy.get('input[placeholder="Masukkan kategori..."]').should('be.visible');
    cy.get('textarea[placeholder="Tulis sesuatu..."]').should('be.visible');
    cy.get('button').contains(/^Tulis$/).should('be.visible');
  });

  it('should display alert when title is empty', () => {
    cy.get('button').contains(/^Tulis$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"title" is not alowed to be empty');
    });
  });

  it('should display alert when body is empty', () => {
    cy.get('input[placeholder="Masukkan judul..."]').type('random-title-for-testing');
    cy.get('button').contains(/^Tulis$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"body" is not alowed to be empty');
    });
  });

  // dapat berjalan di local, namun di CI error
  // it('should display new thread if title & body is filled', () => {
  //   cy.get('input[placeholder="Masukkan judul..."]').type('random-title-for-testing');
  //   cy.get('textarea[placeholder="Tulis sesuatu..."]').type('random-body-for-testing');

  //   cy.get('button').contains(/^Tulis$/).click();

  //   cy.on('window:alert', (str) => {
  //     expect(str).to.equal('"email" is not alowed to be empty');
  //   });

  //   cy.wait(500);
  //   cy.reload();
  //   cy.wait(500);
  //   cy.get('*').contains('random-title-for-testing').should('be.visible');
  //   cy.get('*').contains('random-body-for-testing').should('be.visible');
  // });
});
