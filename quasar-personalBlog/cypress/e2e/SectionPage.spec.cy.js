describe('SectionPage', () => {
  it('renders work title', () => {
    cy.visit('http://localhost:9000/#/Work/');
    cy.get('h2').should('contain', 'Work');
  });
});
