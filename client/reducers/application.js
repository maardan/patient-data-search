import { 
	GETTING_DATA,
	NETWORK_ERROR,
	UPDATE_DATA
} from '../actions';

const initialState = {
	results: [],
	error: false,
	loading: false
};

export default function application(state=initialState, action) {

	switch(action.type) {

		case GETTING_DATA:
			return Object.assign({}, state, {
				loading: true,
				error: false
			});

		case UPDATE_DATA:
			return Object.assign({}, state, {
				results: action.results,
				loading: false,
				error: false
			});

		case NETWORK_ERROR:
			return Object.assign({}, state, {
				error: action.error,
				loading: false
			});

		default:
			return state;
	}
}