describe('ATM withdraw page', function() {
	it('Visit ATM withdraw and test entries', () => {
		cy.visit('http://localhost:3000/atmWithdraw')

		cy.get('#currentBalance')
			.contains('100')
		cy.get('#entryRequest')
			.type('{backspace}210')
			.should('have.attr', 'value', '210')
		cy.get('#machineTotal')
			.contains('£310')
	})
})