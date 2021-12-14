import {combineReducers} from 'redux';

const initalState = {
    results: []
}

const LeagueReducer = (state = initalState, action) => {
    switch(action.type){
        case "GET_LEAGUE_RESULT": return {...state, results: state.results.concat([action.payload])};
        default: return state;
    }
}

export const Reducer = combineReducers({
    league_reducer: LeagueReducer
});

export default Reducer;