describe('ATM login page', function() {
	it('Visit ATM login and test pin entry', () => {
		cy.visit('http://localhost:3000/atmLogin')

		cy.get('#passwordInput')
			.type('1111')
			.should('have.attr', 'value', '1111')
	})
})
