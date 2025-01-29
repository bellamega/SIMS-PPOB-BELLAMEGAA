import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import topUpReducer from './reducers';

// Gabungkan reducer jika ada lebih dari satu
const rootReducer = combineReducers({
  topUp: topUpReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
