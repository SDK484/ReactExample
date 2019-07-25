import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AtmLogin from '../Atm/AtmLogin';
import AtmWithdraw from '../Atm/AtmWithdraw';

const routes = {
	atmLogin: '/atmLogin',
	atmWithdraw: '/atmWithdraw'
};

function AppRoutes() {
	return(
		<Switch>
			<Route path={routes.atmLogin} component={AtmLogin} />
			<Route path={routes.atmWithdraw} component={AtmWithdraw} />
		</Switch>
	);
}

export { routes };
export default AppRoutes;