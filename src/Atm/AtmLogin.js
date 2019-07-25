import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { routes } from '../AppRoutes/AppRoutes';
import axios from 'axios';
import './AtmStyles.css';

class AtmLogin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pin: '',
			error: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.requestData = this.requestData.bind(this);
	}
	
	handleChange(event) {
		// set pin
		const target = event.target;
		this.setState({ pin: target.value });
	}
	
	requestData() {
		// local vars
		const pin = this.state.pin;
		const data = { "pin": pin };
		const url = 'https://frontend-challenge.screencloud-michael.now.sh/api/pin/';
		// server request
		axios({
			method: 'POST',
			url: url,
			data: data
		}).then(response => {
			// get response
			console.log(response.data);
			// not needed
			this.setState({ error: false });
			// send data as prop and
			// open new link to withdraw page
			this.props.history.push({
				pathname: routes.atmWithdraw,
				state: { detail: response.data }
			})
		}).catch(error => {
			// handle error
			console.log(error);
			this.setState({ error: true });
		});
	}
	
	render() {
		const { pin, error } = this.state;
		
		return (
			<Card className="CardLogin">
				<Card.Header>ATM Login</Card.Header>
				<Card.Body>
					<Card.Title>Please provide your PIN</Card.Title>
					<Form.Group controlId="formGroupPassword">
						<Form.Control id="passwordInput" type="password" onChange={(e) => this.handleChange(e)} value={pin} />
					</Form.Group>
					{error && <p className="Alert">Incorrect pin - please try again!</p>}
					<Button variant="primary" onClick={() => this.requestData()}>Enter</Button>
				</Card.Body>
				<Card.Footer className="text-muted"></Card.Footer>
			</Card>
		);
	}
}

export default AtmLogin;