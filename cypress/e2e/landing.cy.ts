describe('Landing Page Navigation', () => {
  it('should load the homepage and navigate to the mock editor', () => {
    cy.visit('/');

    // ✅ Assert homepage URL
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.log('✅ Landed on homepage');

    // ✅ Find the nav button
    cy.contains('Design Yours').should('exist').click();

    // ✅ Assert we're on the editor page (adjust path if needed)
    cy.url().should('include', '/customizer');
    cy.log('🎨 Navigated to the mock editor successfully!');
  });
});
