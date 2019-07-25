import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import './AtmStyles.css';

class AtmWithdraw extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			curBalance: 100,
			request: 0,
			overdraw: false,
			cash: false,
			notes: false,
			fiveNotes: 4,
			tenNotes: 15,
			twenNotes: 7,
			machineTotal: 310
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleRequest = this.handleRequest.bind(this);
	}
	
	componentDidMount() {
		// check if login was successful
		// if not then £100 is set as standard
		if(this.props.location.state !== undefined) {
			this.setState({ curBalance: this.props.location.state.detail.currentBalance });
		}
	}
	
	handleChange(event) {
		// get request entry
		const target = event.target;
		this.setState({ request: target.value });
	}
	
	handleRequest() {
		// local vars
		const { curBalance, machineTotal, fiveNotes,
			tenNotes, twenNotes } = this.state;
		let request = this.state.request;
		const newCurBal = curBalance-request;
		const newMacTot = machineTotal-request;
		let contBool = false;
		
		// dispense notes
		// 20 notes
		if (request >= 20) {
			if (twenNotes > 0) {
				if (request % 20 === 0) {
					let res = request / 20;
					request = 0;
					this.setState({ twenNotes: twenNotes-res });
				} else {
					// find the remainder amount
					let getRemainder = request % 20;
					// remove remaninder amount
					request = request - getRemainder;
					// get 20 notes
					let res = request / 20;
					// leave back in remainder amount
					request = getRemainder;
					this.setState({ twenNotes: twenNotes-res });
				}
			}
		}

		// 10 notes
		if (request >= 10) {
			if (tenNotes > 0) {
				if (request % 10 === 0) {
					let res = request / 10;
					request = 0;
					this.setState({ tenNotes: tenNotes-res });
				} else {
					// find the remainder amount
					let getRemainder = request % 10;
					// remove remaninder amount
					request = request - getRemainder;
					// get 10 notes
					let res = request / 10;
					// leave back in remainder amount
					request = getRemainder;
					this.setState({ tenNotes: tenNotes-res });
				}
			}
		}

		// 5 notes
		if (request >= 5) {
			if (fiveNotes > 0) {
				if (request % 5 === 0) {
					let res = request / 5;
					request = 0;
					this.setState({ fiveNotes: fiveNotes-res });
				} else {
					// find the remainder amount
					let getRemainder = request % 5;
					// remove remaninder amount
					request = request - getRemainder;
					// get 5 notes
					let res = request / 5;
					// leave back in remainder amount
					request = getRemainder;
					this.setState({ fiveNotes: fiveNotes-res });
				}
			}
		}


		// check request is done
		if (request > 0) {
			this.setState({ notes: true });
			contBool = false;
		} else {
			this.setState({ notes: false });
			contBool = true;
		}
		
		
		// adjust machine total
		if (contBool) {		
			if (newMacTot < 0) {
				this.setState({ cash: true });
				contBool = false;
			} else {
				this.setState({ machineTotal: newMacTot });
				this.setState({ cash: false });
				contBool = true;
			}
		}
		
		// check for cash in machine
		if (contBool) {
			// overdraft limit
			if (newCurBal >= -100) {
				this.setState({ curBalance: newCurBal });
				this.setState({ overdraw: false });
			} else {
				this.setState({ overdraw: true });
			}	
		}
	}
	
	render() {
		const { curBalance, request, overdraw, cash, notes, 
			fiveNotes, tenNotes, twenNotes, machineTotal } = this.state;
		
		return (
			<Card className="text-center" className="CardWithdraw">
				<Card.Header>ATM Withdraw</Card.Header>
				<Card.Body>
					<Card.Title>Bank Statement</Card.Title>
					<Card.Text id="currentBalance">
						Current Statement: { curBalance }
					</Card.Text>
					<hr/>
					<Card.Title>Withdraw</Card.Title>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text>£</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl id="entryRequest" aria-label="Amount (to the nearest pound)" 
							onChange={(e) => this.handleChange(e)} value={request} />
						<InputGroup.Append>
							<InputGroup.Text>.00</InputGroup.Text>
						</InputGroup.Append>
					</InputGroup>
					{cash && <p className="Alert">No more cash withdrawals can be made!</p>}
					{overdraw && <p className="Alert">You have reached the withdrawal limit!</p>}
					{notes && <p className="Alert">Incorrect notes available!</p>}
					<Button variant="primary" onClick={() => this.handleRequest()}>Request</Button>
					<hr/>
					<Card.Title>Current Notes in Machine</Card.Title>
					<Card.Text>5 Notes: x{ fiveNotes }</Card.Text>
					<Card.Text>10 Notes: x{ tenNotes }</Card.Text>
					<Card.Text>20 Notes: x{ twenNotes }</Card.Text>
					<Card.Text id="machineTotal">Total: £{ machineTotal }</Card.Text>
				</Card.Body>
				<Card.Footer className="text-muted"></Card.Footer>
			</Card>
		);
	}
}

export default AtmWithdraw;