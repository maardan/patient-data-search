import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './containers/App';
import './index.css';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

render(
<MuiThemeProvider>
	<Provider store={store}>
		<App />
	</Provider>
</MuiThemeProvider>,
document.getElementById('root'));