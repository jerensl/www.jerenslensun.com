describe('Blog page', () => {
    it('should navigate to the article on blog page', () => {
        // Start from the index page
        cy.visit('/')

        // Find a link with an href attribute containing "about" and click it
        cy.get('a[href*="blog"]').click()

        // Find a link with an href attribute containing "about" and click it
        cy.get('article').contains('Read More →').click()

        // The new url should include "/self-reflection-2021"
        cy.url().should('include', '/blog/self-reflection-2021')
    })
})
