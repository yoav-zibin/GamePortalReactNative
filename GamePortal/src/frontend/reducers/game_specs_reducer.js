import { initialState } from '../store/initial_state';

export const gameSpecsReducer = (state = initialState.gameSpecs, action) => {
    switch (action.type) {
        case 'ADD_GAME_SPEC':
            let updatedSpecsList = Object.assign([], state);
            let length = updatedSpecsList.length;
            if (updatedSpecsList.length === 0) {
                updatedSpecsList.unshift(action.gameSpec);
            } else {
                updatedSpecsList.splice(length, 0, action.gameSpec);
            }
            return updatedSpecsList;
        default:
            return state;
    }
};