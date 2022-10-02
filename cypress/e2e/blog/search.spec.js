describe('Blog page', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should find article fundamental algoritma', () => {
        cy.get('a[href*="/blog"]').click()

        const typedText = 'Fundamental Algoritma'

        cy.get('[aria-label="Search Articles"]')
            .type(typedText)
            .should('have.value', typedText)

        // Find a link with an href attribute containing article "fundamental-algoritma" and click it
        cy.get('article').should('have.length', 1)
    })

    it('should not find any article', () => {
        cy.get('a[href*="/blog"]').click()

        const typedText = 'xyz'

        cy.get('[aria-label="Search Articles"]')
            .type(typedText)
            .should('have.value', typedText)

        // The new url should have text "Be Present"
        cy.get('div').contains('No articles found.')
    })
})
