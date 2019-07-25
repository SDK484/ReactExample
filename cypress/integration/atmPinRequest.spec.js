describe('ATM PIN request', function() {
	it('Check server request with PIN', () => {
		const url = 'https://frontend-challenge.screencloud-michael.now.sh/api/pin/';
		cy.request('POST', url, { "pin": '1111' })
			.then((response) => {
				expect(response.status).to.eq(200)
			})
	})
})