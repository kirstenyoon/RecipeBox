import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { HooksChromogenObserver } from 'chromogen';

render(
	<HooksChromogenObserver name="App">
		<App />,
	</HooksChromogenObserver>,
	document.getElementById('root')
);
