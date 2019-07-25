import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes/AppRoutes';
import './App.css';

function App() {
  return (
    <div className="App">
			<Router>
				<main>
					<AppRoutes />
				</main>
			</Router>
    </div>
  );
}

export default App;
