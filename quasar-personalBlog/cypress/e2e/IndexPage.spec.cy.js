describe('HomePage', () => {
  it('should have a contact section', () => {
    // Visits the home page
    cy.visit('http://localhost:9000/#/');
    cy.get('div').should('contain', 'Contact');
  });
});
