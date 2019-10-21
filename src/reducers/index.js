import { combineReducers } from 'redux';
import gridItemsReducer from './gridItems';

const rootReducer = combineReducers({
	gridItemsState: gridItemsReducer,
});

export default rootReducer;


//combine all the reducer
