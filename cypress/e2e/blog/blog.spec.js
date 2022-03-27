describe('Blog page', () => {
    beforeEach(() => {
        cy.visit('/blog')
    })

    it('should navigate to the article on blog page', () => {
        // Find a link with an href attribute containing article "self-reflection-2021" and click it
        cy.get('h1').contains('Self Reflection 2021').click()

        // The new url should have text "Be Present"
        cy.get('strong').contains('Be Present')
    })

    it('should find article fundamental algoritma', () => {
        const typedText = 'Fundamental Algoritma'

        cy.get('[aria-label="Search Articles"]')
            .type(typedText)
            .should('have.value', typedText)

        // Find a link with an href attribute containing article "fundamental-algoritma" and click it
        cy.get('article').should('have.length', 1)
    })

    it('should not find any article', () => {
        const typedText = 'xyz'

        cy.get('[aria-label="Search Articles"]')
            .type(typedText)
            .should('have.value', typedText)

        // The new url should have text "Be Present"
        cy.get('div').contains('No articles found.')
    })
})
