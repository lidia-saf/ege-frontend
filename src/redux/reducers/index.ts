import { combineReducers } from 'redux';
import { testsReducer } from './reducer';
import { testDescriptionsReducer } from './testDescriptionReducer';

export default combineReducers({
    testsReducer,
    testDescriptionsReducer
});
