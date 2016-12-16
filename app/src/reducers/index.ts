import { combineReducers } from 'redux'

const compiler = (state = "TypeScript", action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const framework = (state = "React & Redux", action) => {
    switch (action.type) {
        default:
            return state;
    }
};



const reducers = combineReducers({
    compiler, framework
});

export default reducers