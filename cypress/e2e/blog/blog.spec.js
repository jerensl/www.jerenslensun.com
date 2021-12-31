describe('Blog page', () => {
    it('should navigate to the article on blog page', () => {
        // Start from the index page
        cy.visit('/blog')

        // Find a link with an href attribute containing article "self-reflection-2021" and click it
        cy.get('a[href*="blog"]').click({
            multiple: true,
        })

        // Find a link with an href attribute containing article "self-reflection-2021" and click it
        cy.get('a[href*="/blog/self-reflection-2021"]').click({
            multiple: true,
        })

        // The new url should have text "Be Present"
        cy.get('strong').contains('Be Present')
    })
})
