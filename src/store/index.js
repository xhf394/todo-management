import { createStore } from 'redux' ;
import gridItemsReducer from '../reducers/gridItems';
import rootReducer from '../reducers';


const store = createStore(
  rootReducer
);

export default store;
