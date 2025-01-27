// reducers.js
import { combineReducers } from '@reduxjs/toolkit';
import registrationReducer from './registrationReducer'; // Update path ini sesuai lokasi file

const rootReducer = combineReducers({
  registration: registrationReducer, // Tambahkan registrationReducer di sini
});

export default rootReducer;
