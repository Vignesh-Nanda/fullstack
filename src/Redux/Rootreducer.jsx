// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../Redux/Authslice';

const rootReducer = combineReducers({
  auth: authReducer,
  // other reducers...
});

export default rootReducer;
