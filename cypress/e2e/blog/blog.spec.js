describe('Blog page', () => {
    it('should navigate to the article on blog page', () => {
        // Start from the index page
        cy.visit('/')

        // Find a link with an href attribute containing article "self-reflection-2021" and click it
        cy.get('a[href*="blog"]').first().click()

        cy.get('button').should('have.text', 'Read in Bahasa Indonesia').click()

        // Find a link with an href attribute containing article "self-reflection-2021" and click it
        cy.get('a[href*="/blog/self-reflection-2021"]').first().click()

        // The new url should have text "Be Present"
        cy.get('strong').contains('Be Present')
    })

    it('should find article fundamental algoritma', () => {
        // Start from the index page
        cy.visit('/')

        const typedText = 'Algoritma'

        // Find a link with an href attribute containing article "self-reflection-2021" and click it
        cy.get('a[href*="blog"]').first().click()

        cy.get('button').should('have.text', 'Read in Bahasa Indonesia').click()

        cy.get('[aria-label="Search Articles"]')
            .type(typedText)
            .should('have.value', typedText)

        // Find a link with an href attribute containing article "self-reflection-2021" and click it
        cy.get('a[href*="/blog/fundamental-algoritma"]').first().click()

        // The new url should have text "Be Present"
        cy.get('h3').contains('Growth Rate')
    })

    it('should not find any article', () => {
        const typedText = 'xyz'
        // Start from the index page
        cy.visit('/')

        // Find a link with an href attribute containing article "self-reflection-2021" and click it
        cy.get('a[href*="blog"]').first().click()

        cy.get('button').should('have.text', 'Read in Bahasa Indonesia').click()

        cy.get('[aria-label="Search Articles"]')
            .type(typedText)
            .should('have.value', typedText)

        // The new url should have text "Be Present"
        cy.get('div').contains('No articles found.')
    })
})
