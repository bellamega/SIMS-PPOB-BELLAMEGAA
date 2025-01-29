import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import topUpReducer from './reducers'; // Ensure this is the correct path to your reducer

// Combine your reducers here
const rootReducer = combineReducers({
  topUp: topUpReducer,
  // You can add more reducers here if you have more
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
