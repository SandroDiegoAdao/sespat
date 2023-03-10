import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import calendarReducer from './slices/calendar';

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  calendar: calendarReducer,
});

export default rootReducer;
