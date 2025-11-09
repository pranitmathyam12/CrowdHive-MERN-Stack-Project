import { createStore, combineReducers } from 'redux';
import userReducer from './userReducer';

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (error) {
        console.error('Error saving state to local storage:', error);
    }
};

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.error('Error loading state from local storage:', error);
        return undefined;
    }
};

const persistedState = loadState();


const rootReducer = combineReducers({
    auth: userReducer
  });

const store = createStore(rootReducer, persistedState);


store.subscribe(() => {
    saveState(store.getState());
});

export default store;
