describe('Blog page', () => {
    it('should navigate to the article on blog page', () => {
        // Start from the index page
        cy.visit('/')

        // Find a link with an href attribute containing "about" and click it
        cy.get('a[href*="blog"]').click()

        // Find a link with an href attribute containing "about" and click it
        cy.contains('Read More →')
            .should('have.attr', 'href', '/blog/fundamental-algoritma')
            .click()

        // The new url should include "/about"
        cy.url().should('include', '/blog/fundamental-algoritma')

        // The new page should contain an h1 with "About page"
        cy.get('h3').contains('Growth Rate')
    })
})
