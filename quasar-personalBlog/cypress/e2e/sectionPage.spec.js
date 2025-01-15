describe('SectionPage.vue', () => {
  beforeEach(() => {
    cy.visit('/section/test-section'); // Ajusta la ruta según tu configuración de enrutamiento
  });

  it('renders section title', () => {
    cy.get('h2').should('contain', 'test-section');
  });

  it('shows create button initially', () => {
    cy.get('button').contains('Create').should('be.visible');
  });

  it('shows text editor when create button is clicked', () => {
    cy.get('button').contains('Create').click();
    cy.get('#newPost').should('be.visible');
  });

  it('makes post editable when edit button is clicked', () => {
    // Suponiendo que hay un post con id 1
    cy.get('#editBtn-1').click();
    cy.get('#quillEditor-1 .ql-editor').should('not.have.attr', 'contenteditable', 'false');
  });

  it('deletes post when delete button is clicked', () => {
    // Suponiendo que hay un post con id 1
    cy.get('#deleteBtn-1').click();
    cy.get('#post-1').should('not.exist');
  });
});
