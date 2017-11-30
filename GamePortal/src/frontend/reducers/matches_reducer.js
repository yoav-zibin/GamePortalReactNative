import { initialState } from '../store/initial_state';

export const matchesReducer = (state = initialState.matches, action) => {
    switch (action.type) {
        case 'ADD_MATCH':
            let newMatch = action.match;
            let matchList = Object.assign([], state);
            for (let i = 0; i < matchList.length; i++) {
                if (matchList[i] === newMatch) {
                    return matchList;
                } 
            }
            matchList.push(newMatch);
            return matchList;
        default:
            return state;
    }
};