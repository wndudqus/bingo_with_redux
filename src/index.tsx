import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './reset.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';
import { checkWinner } from './lib/bingoUtils';
import { resetGame } from './modules/bingoGame';

const store = createStore(rootReducer, composeWithDevTools());
store.subscribe(() =>
	checkWinner(store.getState().bingoGameReducer.players, () => {
		store.dispatch(resetGame());
	}),
);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);
reportWebVitals();
