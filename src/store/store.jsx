import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const reducers = {
    // редюсеры
    form: formReducer     // В state все данные формы будут храниться в свойстве form
};

const reducer = combineReducers(reducers);
const store   = createStore(reducer);

export default store;