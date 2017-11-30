import { initialState } from '../store/initial_state';

export const gameCenterReducer = (state = initialState.gameCenter, action) => {
    switch (action.type) {
        case 'SWITCH_GAME':
            let game = action.game;
            return Object.assign({}, state, {
                currentGameId: game.specId,
                currentGameName: game.specName,
                boardImageId: game.boardImageId,
                matchId: game.matchId
            });
        case 'SET_SCALE':
            return Object.assign({}, state, {
               scaleHeight: action.scaleHeight,
               scaleWidth: action.scaleWidth
            });
        default:
            return state;
    }
};